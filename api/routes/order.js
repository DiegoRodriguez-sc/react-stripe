const { Router } = require("express");
const { postOrder, getOrder, updateOrder } = require("../controllers/order.controller");


const router = Router();

router.post("/", postOrder);

router.get("/:id", getOrder);

router.put("/:id", updateOrder);

module.exports = router;