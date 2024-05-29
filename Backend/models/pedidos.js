const mongoose = require('mongoose');
const Pedido = mongoose.model("Pedido",{
        id: Number,
        mesa:String,
        mesero:String,
        productos: [
          {
            id: Number,
            nombre:String,
            precio:String,
            cantidad:Number
          },
        ],
        total:Number,
        estado:String
})
module.exports = Pedido;