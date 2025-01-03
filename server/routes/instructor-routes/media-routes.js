const express = require("express");
const multer = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../helpers/cloudinary");

//configurations
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({ success: true, data: result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Asset ID is required" });
    }
    await deleteMediaFromCloudinary(id);
    res.status(200).json({
      success: true,
      message: "Assest deleted successfully from cloudinary",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error deleting file" });
  }
});

module.exports = router;
