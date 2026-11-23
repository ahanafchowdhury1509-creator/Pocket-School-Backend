express=require('express');
app=express();
router=express.Router();
class blogpost{ 
    constructor(title,content,author,createdAt){
        this.title=title;
        this.content=content;
        this.author=author;
        this.createdAt=createdAt;

    }}

app.listen(3000,()=>console.log('Server running on port 3000'));