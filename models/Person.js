const { default: mongoose } = require("mongoose");
const mongodb = require("mongoose");

const Person = mongoose.model("Person",{
    name: String,
    salary: Number,
    approved: Boolean

})

module.exports = Person
