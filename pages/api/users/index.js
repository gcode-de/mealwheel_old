import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import Asset from "@/db/models/Recipe"; // Angenommen, Sie haben dieses Modell

export default async function handler(request, response) {
  await dbConnect();

  const { method } = request;
  const { action } = request.query; // Beispiel: /api/assets?action=softDelete

  switch (method) {
    case "GET":
      // Logik für GET-Anfragen
      const userWithAssets = await User.findById(
        "65d89f5846848f9939128fe0"
      ).populate("assets");
      console.log(userWithAssets);
      return response.status(200).json(userWithAssets);

    case "POST":
      // Logik für POST-Anfragen (z.B. Erstellen eines neuen Assets)
      try {
        const newAsset = new Asset(request.body); // Erstellen eines neuen Asset-Dokuments
        await newAsset.save();
        await User.findByIdAndUpdate(request.body.userId, {
          $push: { assets: newAsset._id },
        }); // Angenommen, userId wird im Body gesendet
        return response.status(201).json(newAsset);
      } catch (error) {
        console.error(error);
        return response.status(400).json({ error: error.message });
      }

    case "PUT":
      try {
        // Unterscheiden der Aktionen basierend auf `action` Query-Parameter
        switch (action) {
          case "update":
            // Asset-Update-Logik
            await Asset.findByIdAndUpdate(request.body.id, request.body);
            return response.status(200).json({ message: "Asset updated" });
          case "softDelete":
            // Soft-Delete-Logik
            await Asset.findByIdAndUpdate(request.body.id, { isDeleted: true });
            return response.status(200).json({ message: "Asset soft-deleted" });
          case "softUndelete":
            // Soft-Undelete-Logik
            await Asset.findByIdAndUpdate(request.body.id, {
              isDeleted: false,
            });
            return response
              .status(200)
              .json({ message: "Asset soft-undeleted" });
          default:
            return response.status(400).json({ error: "Invalid action" });
        }
      } catch (error) {
        console.error(error);
        return response.status(400).json({ error: error.message });
      }

    default:
      return response.status(405).json({ error: "Method not allowed" });
  }
}
