const mongoose=require("mongoose");
const data=require("./data")
const User=require("./models/chat.js");
main().then(()=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wattsapp");
}

for(const chat of data){
const user=new User(chat);
user.save()
.then((result)=>{
    console.log(result);
})
.catch(()=>{
    console.log(err);
})
}