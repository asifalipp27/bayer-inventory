
const mongoose = require('mongoose');
const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB connection successful.');
    })
    .catch((err) => {
        console.log(`DB connection error: ${err}`);
    });
}
module.exports = connectDB;
