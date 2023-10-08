const express=require('express')
const server=express()
const mongoose = require('mongoose');
const Schema=mongoose.Schema
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/school');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const studentSchema=new Schema({
    name:String,
    age:Number,
    
})
server.use(express.json())
// 
const Student=mongoose.model('student',studentSchema)
 server.get('/students',async (req,res)=>{
    try {
        const results = await Student.find({}).distinct('name').exec(); // This returns a Promise
        res.json(results)
    } catch (error) {
        // Handle errors here
        console.error(error);
    }
})

server.post('/students/add', async(req,res)=>{
    let student=new Student();
    student.name=req.body.name;
    student.age=req.body.age;
    try {
        await student.save()
        res.status(200).send("Successfully added")
    } catch (error) {
        res.status(400).send(error)
    }
})
server.put("/students/:id",async (req,res)=>{
    const {id}= req.params
    const {name}=req.body
    const {age}=req.body
    try {
        const student=await Student.findOneAndUpdate({_id:id},{name:name,age:age})
        res.status(200).send('Succesfully updated')
    } catch (error) {
        res.status(400).send(error)
    }
 
 
})
server.delete("/students/:id",async (req,res)=>{
    try {
        await Student.findByIdAndRemove(req.params.id)
        res.status(200).send('succesfully deleted')
    } catch (error) {
        res.status(400).send(error)
    }


   
  })
server.listen('5000',()=>{console.log('hit the server')})