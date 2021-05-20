const express=require('express');
const app=express();
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://AdityaBora:NtGI9iVzpEETRJgK@reactapp.xmrk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(function () {
  console.log('success');
});
app.get('/',function(req,res){
  res.send('hello world');
});
app.listen(5000);
