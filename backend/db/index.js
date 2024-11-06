//  start writing from here
const mongoose = require("mongoose");
require('dotenv').config();

const ConnectDB = async () => {
    try {
        console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
        console.log(`MONGO_URI type: ${typeof process.env.MONGO_URI}`);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
};

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
    userId : ObjectId,
    title : {type :String,required : true},
    completed : Boolean
})

const UserSchema = new Schema({
    username : {type : String, required : true},
    password : {type : String, required : true}
})

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    ConnectDB,
    User,
    Todo,
};