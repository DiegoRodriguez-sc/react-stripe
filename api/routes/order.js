const { Router } = require("express");
const { postOrder, getOrder, updateOrder, checkOrder } = require("../controllers/order.controller");

const router = Router();

router.post("/", postOrder);

router.get("/:id", getOrder);

router.put("/:id", updateOrder);

router.put("/confirm/:id", checkOrder);

module.exports = router;