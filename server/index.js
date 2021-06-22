const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const { User }=require('./models/user');
const config=require('./config/key');
const {auth}=require("./middleware/auth")
mongoose.connect(config.mongoURI,{useNewUrlParser:true,useUnifiedTopology:true}).then(function () {
  console.log('success');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/user/auth",auth,(req,res)=>{
  res.status(200).json({
    _id:req._id,
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role:req.user.role

  })
})
app.post("/api/users/register",function (req,res) {
    const user=new User(req.body);

    user.save(function(err,userData){
      if(err) return res.json({success:false,err});
        return res.status(200).json({success:true});
    });


});


app.post("/api/user/login",function(req,res){
  //find email
  User.findOne({email:req.body.email},function(err,user){
    if(!user)
    return res.json({
      loginSuccess:false,
      message:"Auth failed"
     });

     //password compare
     user.comparePassword(req.body.password,function(err,isMatch){
       if(!isMatch)
       return res.json ({loginSuccess:false,message:"wrong password"});
     });

     //token generation and send to cookie
     user.generateToken(function (err,user) {
       if(err)
       return res.status(400).send(err);
       res.cookie("x_auth",user.token).status(200).json({loginSuccess:true});
     });

  });

});

app.get('/api/user/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc)=>{
    if(err)return res.json({success:false,err})
    return res.status(200).send({success:true})
  })
})












const port=process.env.PORT || 5000

app.listen(port,()=>{
  console.log(port+'kk');
});
