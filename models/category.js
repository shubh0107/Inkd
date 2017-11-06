var mongoose = require("mongoose");


var categorySchema = new mongoose.Schema({
    name : String,
    blogs : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);

