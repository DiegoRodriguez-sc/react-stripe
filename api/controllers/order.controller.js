const Order = require("../models/order")


const postOrder = async (req, res) => {
 try {
     const { amount, name } = req.body;
     const order = await Order.create({
         name,
         amount
     });
     res.status(201).send({ data: oderRes });
 } catch (e) {
     console.log(e);
     res.status(500);
     res.send({ error: 'Algo ocurrio' });
 }
}

module.exports = { postOrder }