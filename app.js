const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ =require("lodash");



const homeStartingContent = "Welcome!!! You can compose and post your blogs here...";
const aboutContent = "Blog Website....";
const contactContent = "khushipoddar01071999@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-khushi:test123@cluster0.1wejz.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {

 title: String,

 content: String

};

const Post = mongoose.model("Post", postSchema);


app.get("/",function(req,res){

  Post.find({}, function(err, posts){

   res.render("home", {

     startingContent: homeStartingContent,

     posts: posts

     });

 })

});

app.get("/about",function(req,res){
  res.render("about" , {aboutPage: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact" , {contactPage: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");

});
app.post("/compose",function(req,res){
  const post = new Post ({
    title: req.body.postTitle,
    content:  req.body.bodyText
  });

  post.save(function(err){

   if (!err){

     res.redirect("/");

   }

 });


  res.redirect("/");
});

app.get("/posts/:postId" ,function(req,res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post",{
      title: post.title,
      content: post.content
  });

});
});




app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
