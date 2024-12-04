const express = require("express");
const app = express();
const mongoose = require("mongoose")
app.use(express.json());
const cors = require("cors")


app.use(cors({
    origin:["https://react3-frontend-frontend-gjvk.vercel.app","http://localhost:3000"]
}))

try{
    mongoose.connect("mongodb+srv://arjuntudu9163:nsCNHXlznMk7JmhW@cluster0.cq6wv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}catch(e){
    if(e){
        console.log("database connection error",e);
    }
}

const User = mongoose.model("user",{
    name:String,
    password:String,
    items:[]
})

const Item = mongoose.model("item",{
     
    name:String,
    price:Number,
    image:String,
    userId:String

})

app.post("/login",async (req,res)=>{
     
    console.log(req.body)
    try{
       
        const response = await User.find({
            name:req.body.name,
            password:req.body.password
        })
        console.log(response)
        res.json(response);

    }catch(e){
         
        if(e){
            console.log(e);
        }
    }
     

})


app.post("/register",async (req,res)=>{ 

    if(req.body.password === req.body.re_password){
        
        try{
            const response = await User.create({name:req.body.name,password:req.body.password});
            console.log(response , "<===== response register" )

            res.json(response)
        }catch(e){
            if(e){
                console.log(e);
            }
        }

    }else{
        res.status(404)
    }
})

app.post("/deleteItem",async(req,res)=>{
     
    try{
        const response = await Item.deleteOne({_id:req.body.id});
        console.log(response)

        res.json(response);

    }catch(e){
        console.log(e);
    }

})


app.post("/registerItem",async(req,res)=>{


      try{
         const response = await Item.create(req.body);
         res.json(response);

      }catch(e){
         if(e){
            console.log(e);
         }
      }

})

app.get("/getItems",async(req,res)=>{

    try{
       const response = await Item.find({});
      
       res.json(response);

    }catch(e){
       if(e){
          console.log(e);
       }
    }

})


app.get("/",(req,res)=>{
     
    try{
        res.json({"val":"started"})
    }catch(e){
        if(e){
            console.log(e);
        }
    }

})

app.listen(5000,(err)=>{
   
    if(err){
        console.log(err)
    }else{
        console.log("app started")
    }

})