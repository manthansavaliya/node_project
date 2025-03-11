const mongoose = require('mongoose');

const url = process.env.url ?? "mongodb://localhost:27017/testNodeProject";

mongoose.connect(url).then(() => {
    console.log("DataBase Connected.");
}).catch((err) => {
    console.log("Error Occurred.", err);
});

module.exports = mongoose;