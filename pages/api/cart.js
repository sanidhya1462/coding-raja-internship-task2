import jwt from "jsonwebtoken";
import Cart from "@/model/Cart";
import Authenticated from "@/helpers/Authenticated";
import initDB from "@/helpers/initDB";

initDB();
export default async (req, res) => {
  if (req.method === "GET") {
    await fetchUserCart(req, res);
  } else if (req.method === "PUT") {
    await addProduct(req, res);
  } else if (req.method === "DELETE") {
    await deleteProduct(req, res);
  }
};

const fetchUserCart = Authenticated(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate(
    "products.product"
  );
  res.status(200).json(cart.products);
});

const addProduct = Authenticated(async (req, res) => {
  const { quantity, productId } = req.body;
  const cart = await Cart.findOne({ user: req.userId });
  const pExists = cart.products.some(
    (pdoc) => productId === pdoc.product.toString()
  );
  if (pExists) {
    await Cart.findOneAndUpdate(
      {
        _id: cart._id,
        "products.product": productId,
      },
      {
        $inc: { "products.$.quantity": quantity },
      }
    );
  } else {
    const newProduct = { quantity: quantity, product: productId };
    await Cart.findOneAndUpdate(
      {
        _id: cart._id,
      },
      {
        $push: { products: newProduct },
      }
    );
  }
  res.status(200).json({ message: "product added to cart" });
});

const deleteProduct = Authenticated(async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOneAndUpdate(
    { user: req.userId },
    { $pull: { products: { product: productId } } },
    { new: true }
  ).populate("products.product");
  console.log(cart.products);
  res.status(200).json(cart.products);
});
