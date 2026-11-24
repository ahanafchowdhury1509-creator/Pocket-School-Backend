const express=require('express');
const app=express();
const Joi=require('joi');
app.use(express.json());
let curID=1
const posts=[]
class blogpost{ 
    constructor({title,content,author,id}){
        this.title=title;
        this.content=content;
        this.author=author;
        this.id=id;
     

        this.createdAt=new Date().toDateString();
        }}
const val=Joi.object({
      title:Joi.string().min(3).required(),
      content:Joi.string().min(10).required(),
      author:Joi.string().required(),
      
    
    })

app.post('/post',(req,res)=>{
    const {error}=val.validate(req.body);
     if(error){
        return res.status(400).send(error.details[0].message);
     }
    const newPost=new blogpost({...req.body,id:curID++});
    posts.push(newPost);
    return res.status(201).send({
            message:"Blog post created successfully",
            post:newPost});
})
app.get('/post/:id',(req,res)=>{
    let id=req.params.id;
    const post=posts.find((post)=>post.id==id);
    if(!post){
        return res.status(404).send("Post not found");
    }
    return res.status(200).send(post);
})

app.listen(3000,()=>console.log("Server running on port 3000")); 