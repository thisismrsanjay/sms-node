const numberInput = document.getElementById('number'),
      textInput = document.getElementById('msg'),
      button = document.getElementById('button'),
      response = document.getElementById('response');


button.addEventListener('click',send,false);

const socket = io();
socket.on('smsStatus',(data)=>{
    response.innerHTML='Text Sent to '+data.number+'Remaining balance :'+data.balance;
})


function send(){
     const number = numberInput.value.replace(/\D/g,'');
     const text = textInput.value;

     fetch('/',{
         method:'post',
         headers:{
             'content-type':'application/json'
         },
         body:JSON.stringify({number:number,text:text})
     })
     .then((response)=>{
        console.log(response);
     })
     .catch((err)=>{
         console.log(err);
     })
}