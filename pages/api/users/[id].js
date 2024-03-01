import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const product = await Product.findById(id).populate("reviews");

    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(product);
  }

  if (request.method === "PUT") {
    try {
      await Product.findByIdAndUpdate(id, request.body);
      return response.status(200).json("Product updated");
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      return response.status(200).json("Product deleted");
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
