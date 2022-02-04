const { Router } = require("express");
const { postOrder, getOrder } = require("../controllers/order.controller");


const router = Router();

router.post("/", postOrder);

router.get("/:id", getOrder);

module.exports = router;