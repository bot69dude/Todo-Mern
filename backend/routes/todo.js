//  start writing your code from here
const express = require('express');
const {Todo} = require("../db");
const { Auth } = require("../middleware/user");

const router = express.Router();
router.use(Auth);

router.post("/", async(req,res)=>{
    const {Title , Completed, UserId} = req.body;
    console.log(UserId);
    
    if (!Title){
        return res.status(400).json({
            msg : "You have empty To-do"
        });
    }

    try{
        const newTodo = await Todo.create({
            title: Title,
            completed : Completed,
            userId : UserId,
        });

        res.status(201).json({
            msg: "Todo Created 😁",
            todo: newTodo,
        });
    }catch (error) {
        res.status(500).json({
            msg : "Error Creating TO-DO!",
            error : error.message,
        });
    }
});

router.get("/", async (req,res)=>{
    try{
        const LoginUser = req.userId;
        const todos = await Todo.findOne({
            userId : LoginUser
        });

        res.json({
            todos: todos,
        });
    }catch(error){
        res.status(500).json({
            msg: "Error Fecting Todo's",
            error : error.message,
        });
    }
});

router.put("/:id", async (req,res) =>{
    const {id} = req.params;
    const update = req.body;

    if (typeof update.completed === 'undefined'){
        return res.status(400).json({
            msg : "You Must Provide Complete Status. ",
        });
    }
    try {
        const result = await Todo.updateOne(
            {_id: id},
            {Completed: update.completed }
        );

        res.json({
            msg: "Updated To-Do Succussfully 👍",
            result: result
        });
    }catch(error){
        res.status(500).json({
            msg : "Error Updating To-Do",
            error : error.message,
        });
    }
});

router.delete("/:id",async (req,res)=>{
    const {id} = req.params;

    try{
        const result = await Todo.findByIdAndDelete(id);

        if (!result){
            return res.status(404).json({
                msg : "Todo Not Found"
            });
        }
        res.json({
            msg: "Todo Deleted Successfully !",
            result: result
        });
    }catch{
        return res.status(500).json({
            msg: "Error while Deleting Todo!",
            error : error.message
        });
    }
});

module.exports = router;