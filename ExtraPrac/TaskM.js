const express =require('express');
const app=express();
const Joi=require('joi');
app.use(express.json());
curId=0;
tasks=[];
class Task{
    constructor(id,title,status,priority){
        this.id=id;
        this.title=title;
        this.status=status;
        this.priority=priority;
        this.createdAt=new Date().toDateString();
    }
}
const uvi=Joi.object({
    title:Joi.string().min(3).required(),
    status:Joi.string().valid('pending','in-progress','completed').required(),
    priority:Joi.number().min(1).max(5).required(),});
app.post('/task',(req,res)=>{
    const {error,value}=uvi.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const {title,status,priority}=value;
    const newTask=new Task(++curId,title,status,priority);
    tasks.push(newTask);
    return res.status(201).send(
        {
            "message": "Task created successfully",
            "task": newTask
        }
    )
})   
app.get("/task/:id",(req,res)=>{
    const id=req.params.id;
    const task=tasks.find((t)=>t.id==id);
    if(!task){
        return res.status(404).send({
            "message": "Task not found"
        })
    }
    if(task.status!=="completed"){
        return res.status(404).send({
            "message": "Task is not completed"
        })
    }
    res.status(200).send({
        "message": "Task retrieved successfully",
        task
        
    })
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})