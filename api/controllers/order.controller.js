const Order = require("../models/order");

//TODO: generar una nueva orden
const postOrder = async (req, res) => {
  try {
    const { amount, name } = req.body;
    const order = await Order.create({
      name,
      amount,
    });
    res.status(201).send({ data: order });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

//TODO: obtener los datos de la orden
const getOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  res.status(200).send({ data: order });
};


module.exports = { postOrder, getOrder };
