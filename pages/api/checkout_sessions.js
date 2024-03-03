import Cart from "@/model/Cart";
import Stripe from "stripe";
import { v4 as uuidV4 } from "uuid";
import Jwt from "jsonwebtoken";
import Order from "@/model/Order";
import initDB from "@/helpers/initDB";
import users from "@/model/users";
import baseUrl from "@/helpers/baseUrl";

initDB();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
      return res.status(401).json({ error: "You must logged-in" });
    }
    try {
      const { userId } = Jwt.verify(authorization, process.env.JWT_SECRET);
      const USER = await users.findOne({ _id: userId });
      const cart = await Cart.findOne({ user: userId }).populate(
        "products.product"
      );
      console.log(cart.products[0].product.name);
      let price = 0;
      cart.products.forEach((item) => {
        price = price + item.quantity * item.product.price;
      });

      const lineItems = cart.products.map((product) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.product.name,
          },
          unit_amount: product.product.price * 100,
          tax_behavior: "exclusive",
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
        quantity: product.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${baseUrl}/cart?success=true`,
        cancel_url: `${baseUrl}/?canceled=true`,
      });

      res.status(200).json({ url: session.url });

      // res.redirect(session.url);
      await new Order({
        user: userId,
        email: USER.email,
        total: price,
        products: cart.products,
      }).save();

      await Cart.findOneAndUpdate(
        { _id: cart._id },
        { $set: { products: [] } }
      );
    } catch (err) {
      console.log(err);
      //   return res.status(401).json({ error: "You must logged-in" });

      return res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
