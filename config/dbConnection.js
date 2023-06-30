const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTIOCN_STRING);
        console.log("database connected", connect.connection.name, connect.connection.host)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports=connectDb;
