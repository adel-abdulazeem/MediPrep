const express = require("express");
const router = express.Router();
const medController = require('../controllers/medications')
// const upload = require("../middleware/multer");
const { ensureAuth} = require("../middleware/auth");

router.post('/create', medController.CreateMed)

module.exports = router;


