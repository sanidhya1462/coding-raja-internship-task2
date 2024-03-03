import initDB from "@/helpers/initDB";
import Product from "@/model/Product";

initDB();
export default async function handler(req, res) {
  if (req.method === "GET") {
    await getAllProducts(req, res);
  } else if (req.method === "POST") {
    await saveProduct(req, res);
  }
}

async function getAllProducts(req, res) {
  try {
    const result = await Product.find();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
}
async function saveProduct(req, res) {
  const { name, price, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).json({ error: "Please Add all the fields" });
    }
    const product = await new Product({
      name: name,
      price: price,
      mediaUrl: mediaUrl,
      description: description,
    }).save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
  }
}
