const express=require("express");
const { url } = require("inspector");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");
app.use(methodOverride("_method"));


const port=8080;
app.listen(port,()=>{
    console.log("listening to the port:8080");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

let posts=[{
    id:uuidv4(),
    username:"Renu",
    profession:"Software Engineer",
    caption:"Hii fame, this is my first post .",
    // image:"https://media.istockphoto.com/id/1458782106/photo/scenic-aerial-view-of-the-mountain-landscape-with-a-forest-and-the-crystal-blue-river-in.jpg?s=612x612&w=is&k=20&c=FKTfwrl6zzuQUkwfonWJNXXVsHdlSnkdm1izsbCEf_E="
    image:"https://media.istockphoto.com/id/136917788/photo/xl-migrating-canada-geese.webp?b=1&s=170667a&w=0&k=20&c=xjf5CrfXn4wCaNniXEDfyU_nvgLy6_cY9Yj3eIjOoAg="
},
{
    id:uuidv4(),
    username:"David",
    profession:"Software Engineer",
    caption:"my new bike",
    image:"https://media.istockphoto.com/id/1171675830/photo/motorcycle-driver-riding-in-dolomite-pass-italy-europe.jpg?s=612x612&w=0&k=20&c=V0LxcYxRJxQ7wDVuGxMF_suUte5BKonn-a_EUyeNNQg="
},
{
    id:uuidv4(),
    username:"Bob",
    profession:"Software Engineer",
    caption:"first day at office",
    image:"https://media.istockphoto.com/id/1410270664/photo/modern-style-office-with-exposed-concrete-floor-and-a-lot-of-plants.jpg?s=612x612&w=0&k=20&c=lBivR3vIWH4dnb6MUNkQtQsIisaUEnzl2f6Ozyr-Jis="
}
];


// app.get("/",(req,res)=>{
//     res.send("work successfully");
// });

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs")
   
});

app.post("/posts",(req,res)=>{
    let id=uuidv4();
    let{username,caption,image,profession}=req.body;
    posts.push({id,username,profession,caption,image});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((obj)=>{
        return id===obj.id;    
    });
    res.render("show.ejs",{post});

});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let NewCaption=req.body.caption;
    // let NewProfession=req.body.profession;
    let post=posts.find((obj)=>{
        return id===obj.id;    
    });
    post.caption=NewCaption;
    // post.profession=NewProfession;
    res.redirect("/posts");

});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((obj)=>{
        return id===obj.id;    
    });
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((obj)=>{
        return id!==obj.id;    
    });
    res.redirect("/posts");
})