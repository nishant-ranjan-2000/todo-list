const express = require("express");
const bodyParser = require("body-parser");

const app=express();

let items=[];
let workList=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine','ejs');

app.get("/",function(req,res){
  let today=new Date();
  let options={
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day=today.toLocaleDateString("en-US", options);
  res.render("list",{listTitle: day, newListItems: items});
});

app.post("/",function(req, res){
  let item = req.body.new_item;
  if(req.body.list==="outside"){
    workList.push(item);
    res.redirect("/outside");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/outside",function(req,res){
  res.render("list",{listTitle:"outside Work", newListItems: workList});
});

app.listen(3000,function(){
  console.log("server started at port 3000");
});
