var mongoose = require("mongoose");


var categorySchema = new mongoose.Schema({
    name : String,
    blogs : [
        {
            title: String,
            content: String,
            image: String,
            createdAt: Date,
            author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                username: String
            }
        }
    ]
});

module.exports = mongoose.model("category", categorySchema);

