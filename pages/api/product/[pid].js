import Product from "@/model/Product";

export default async (req, res) => {
  if (req.method === "GET") {
    await getProduct(req, res);
  } else if (req.method === "DELETE") {
    await deleteProduct(req, res);
  }
};

async function getProduct(req, res) {
  const { pid } = req.query;
  try {
    const product = await Product.findOne({ _id: pid });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
}
async function deleteProduct(req, res) {
  const { pid } = req.query;
  try {
    await Product.findByIdAndDelete({ _id: pid });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
  }
}
