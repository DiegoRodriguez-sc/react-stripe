const { Router } = require("express");
const { postOrder } = require("../controllers/order.controller");


const router = Router();

router.post("/", postOrder);

module.exports = router;