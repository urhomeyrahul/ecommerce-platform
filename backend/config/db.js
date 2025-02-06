const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoogse.connect(process.env.MONGO_URI, {
            newUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected with ${MONGO_URI}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;