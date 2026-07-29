




let chatContent=document.querySelectorAll(".chat-content");
let username=document.querySelectorAll(".User_to");
username.forEach((user,index)=>{
user.addEventListener("click",()=>{
    chatContent.forEach(chat=>{
         chat.style.display="none";
    })
   chatContent[index].style.display="block";
})
})
let p=document.querySelector(".inp");
let input=document.querySelector(".input");
p.addEventListener("click",()=>{
input.style.display="block"; 
});
let editForm=document.querySelector(".edit-form");
let inp=document.querySelector(".to-input");
let edits=document.querySelectorAll(".edit");
edits.forEach((edit)=>{
edit.addEventListener("click",()=>{
    // inp.value="ankesh"
    editForm.style.display="block"; 
})
})







