const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const { User }=require('./models/user');
const config=require('./config/key');

mongoose.connect(config.mongoURI,{useNewUrlParser:true,useUnifiedTopology:true}).then(function () {
  console.log('success');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register',function (req,res) {
    const user=new User(req.body);
    user.save(function(err,userData){
      if(err)return res.json({success:false,err});
        return res.status(200).json({success:true});
    });

});
















app.listen(5000);
