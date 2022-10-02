const mongoose = require("mongoose");

const connectDb = () =>

mongoose.connect(process.env.MONGO_URI,
{useNewUrlParser: true,
    useUnifiedTopology : true,
}).then(()=> console.log("DB Connected"))
.catch(console.eror);

module.exports = connectDb;