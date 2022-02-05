const Order = require("../models/order");
const { generatePaymentIntent } = require("../services/stripe");

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

//TODO: preparamos el pago
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.body;

    //TODO: Buscamos orden en nuestra base de datos

    const order = await Order.findById(id);

    //TODO: Generamos intencion de pago

    const resPaymentIntent = await generatePaymentIntent({
      amount: order.amount,
      user: order.name,
      payment_method: token,
    });

    //TODO: Actualizamos  orden con id de intencion de pago
    console.log(resPaymentIntent);
    await Order.findByIdAndUpdate(id, {
      stripeId: resPaymentIntent.id,
    });

    res.status(201).send({ data: resPaymentIntent });
  } catch (e) {
    console.log(e.message);
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

module.exports = { postOrder, getOrder, updateOrder };
