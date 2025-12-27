import express from "express"
import cors from "cors"
import mongoose from "mongoose";


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/CRUD")
.then(()=>{
    console.log("Connected to DB")
})
.catch((err)=>{
    console.log(err)    
})


const userSchema1 = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const admin = mongoose.model('admin', userSchema1);

app.get('/adminpass', async(req,res)=>{
    let data = await admin.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})

app.get('/adminpass/:id', async(req,res)=>{
    let data = await admin.find();
    res.json(data);
    res.status(200).send("Data Fetched Successfully");
})


app.post('/adminpass/update', async(req,res)=>{
   if(!req.body){
    req.status(400).send("Give the Proper Details")
   }
    const data= new  admins(req.body);
    await data.save();

    res.status(201).send("Data Saved Successfully");

})


// app.put('/todo/:id', async(req,res)=>{
//     const id=  req.params.id;
//     const data=req.body;
//     console.log(data);
//     await Tasks.findByIdAndUpdate(id, data,{new:true});
//     res.send("Data Updated Successfully");
// })

// app.delete('/todo/:id',async (req,res)=>{
//     const id = req.params.id;
//     await Tasks.findByIdAndDelete(id);
//     res.send("Data Deleted Successfully");
// })



app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})