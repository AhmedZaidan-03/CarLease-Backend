const express= require('express');
const cors= require('cors');
const bcrypt= require('bcrypt');
const validator= require('validator');
const {v4: uuidv4}= require('uuid');
const mongoose= require('mongoose');

const car_2= require('./models/car');
const order_2= require('./models/order');
const user_2= require('./models/user');

const app= express();

app.use(express.json());
app.use(express.text());
app.use(cors());

mongoose.connect("mongodb+srv://ali2:Ali2000@cluster0.qzlog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected Successfully");
}).catch((error)=>{
    console.log("Error with connecting with database", error);
})



app.post("/signIn", async (req,res)=>{
    const {name, email, password}= req.body;

    if(!name || !email || !password){
        return res.status(400).json({error: "Name, email, password är required"})
    }

    if(!validator.isEmail(email)){
        return res.status(400).send("Invanlid email format")
    }

    try{
    const saltRounde= 10;
    const hashedPassw= await bcrypt.hash(password, saltRounde);

    const newUser= new user_2();
    newUser.name= req.body.name;
    newUser.email= req.body.email;
    newUser.password= hashedPassw;
    const userId = uuidv4();
    newUser.user_id= userId;

    await newUser.save();
    res.status(201).json({message: "User created Successfully"});
    } catch (error){
        res.status(500).send(error);
    }

})




app.post("/login", async(req,res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        return res.status(400).json({error: "Email and password is required"});
    }

    try{

    const user= await user_2.findOne({email});

    if(!user){
        return res.status(401).json({error: "Invalid email or password"});
    }

    const isMatch= await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({error: "Invalid email or password"});
    }

    res.status(200).send("Login Successfull");
}catch(error){
    res.status(500).send(error);
}
})





app.listen(4000, ()=>{
    console.log("Server is listening");
})