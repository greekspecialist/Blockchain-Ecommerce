const mongoose = require('mongoose');

mongoose.connect(
'your connection string', 
'mongodb+srv://Shatvik2002:9984359877@cluster0.nivenlb.mongodb.net/?retryWrites=true&w=majority',

{useNewUrParsers: true, useUnifiedTopology: true}
);

const paymentSchema = new mongoose.Schema({
id: String,
itemId: String,
paid:Booleam
});
module.exports = {Payment}