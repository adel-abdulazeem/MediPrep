const express = require("express");
const router = express.Router();
const medController = require('../controllers/medications')
// const upload = require("../middleware/multer");
const { ensureAuth} = require("../middleware/auth");

router.get('/', medController.getMed)
router.post('/create', medController.createMed)
router.put('/update/:id', medController.updateMed)


module.exports = router;


