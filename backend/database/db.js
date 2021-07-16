const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://dilmi:mF29h3gD05aFQ6H7@minolicluster.gya2y.mongodb.net/Events?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
            
        });
        console.log('Database connection success');
    }catch (err){
        console.log(err)
    }
};

module.exports = connectDB;