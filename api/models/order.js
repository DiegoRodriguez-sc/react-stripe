const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  stripeId: {
    type: String,
    default: null,
  },
  status:{
   type: String,
   enum: ["success","fail", "wait"],
   default: "wait"
  }
},{
  timestamps:true,
  versionKey:false
});

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  data.uid = _id;
  return data;
};

module.exports = model("Order", OrderSchema);
