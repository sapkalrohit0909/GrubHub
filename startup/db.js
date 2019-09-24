const mongoose=require('mongoose');
module.exports=()=>{
    mongoose.connect("mongodb://localhost/grubhub",{ useNewUrlParser: true ,useUnifiedTopology: true })
    .then(()=> console.log("successfully connected to mongoDB"))
    .catch((err)=>console.log("error :"+err));
    mongoose.set('useFindAndModify', false);
}
