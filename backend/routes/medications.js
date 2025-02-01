const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const mediController = require("../controllers/medications");
const { ensureAuth} = require("../middleware/auth");

router.get("/:id", ensureAuth, mediController.getPost);
router.post("/createMedi", ensureAuth, mediController.createPost);
router.put("/editMedi/:id", ensureAuth, mediController.likePost);
router.put("/updateMediInfo/:id", ensureAuth, mediController.likePost);
router.delete("/deleteMedi/:id", ensureAuth, mediController.deletePost);

module.exports = router;
