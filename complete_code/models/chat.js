const mongoose=require("mongoose");
const schema=mongoose.Schema;
const userSchema=new schema({
    to:{type:String,
        required:true,
    },
    img_src:String,
    to_message:[{     
        type:String,
    }],
     from_message:[{     
        type:String,
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model("User",userSchema);
module.exports=User;