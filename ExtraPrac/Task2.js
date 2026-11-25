const express=require('express');
const app=express();
const port=3000;
const Joi=require('joi');
let currID=0;
const tracks=[];
const trackName=[];
app.use(express.json());
class Track{
    constructor(id,songName,artist,duration,bpm,addedAt){
        this.id=id;
        this.songName=songName;
        this.artist=artist;
        this.duration=duration;
        this.bpm=bpm;
        this.addedAt=new Date().toDateString();
    }
}
const uvi=Joi.object({
    songName:Joi.string().min(3).required(),
    artist:Joi.string().required(),
    duration:Joi.number().min(30).required(),
    bpm:Joi.number().min(40).max(240).required(),

})
app.post('/setlist',(req,res)=>{
    const {error,value}=uvi.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const {songName,artist,duration,bpm}=value;
    if(trackName.includes(songName)){
        return res.status(409).send("Song already exists in the setlist");
    }
    trackName.push(songName); 
    const newTrack=new Track(++currID,songName,artist,duration,bpm);
    tracks.push(newTrack);

    res.status(201).send(newTrack);
});
app.get('/setlist',(req,res)=>{
    let totalDuration=0;
    for (i in tracks){
        totalDuration += tracks[i].duration;
    }
    res.send({
        message:"Track found",
        "Duration of all tracks":totalDuration
    });
});
app.delete('/setlist/:id',(req,res)=>{
    const id=parseInt(req.params.id);
     const track=tracks.find(t=>t.id===id);
     if(!track){
        return res.status(404).send("Track not found");
     }
    const trackIndex=tracks.indexOf(track);
    tracks.pop(trackIndex);
    res.send({
        message:"Track deleted successfully",
      
    });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
