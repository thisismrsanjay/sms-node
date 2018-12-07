const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo  = require('nexmo');
const socketio = require('socket.io');
const path = require('path');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));

//init NEXMO
const nexmo = new Nexmo({
    apiKey: '1cb92f21',
    apiSecret: 'swNX7sGpjqfhXAVR'
  },{debug:true});



app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/',(req,res)=>{
    const number  = req.body.number;
    const text = req.body.text;
    console.log(text);
    const from = 'Nexmo'

    nexmo.message.sendSms(from, number, text,{type:'unicode'},
        (err,responseData)=>{
            if(err){
                console.log(err);
            }else{
                console.dir(responseData);
                //Get data from response
                const data = {
                    id:responseData.messages[0]['message-id'],
                    number:responseData.messages[0]['to'],
                    balance:responseData.messages[0]['remaining-balance'],
                }
                //Emit to client 
                io.emit('smsStatus',data);
            }
        }
    )
})


const server = app.listen(3000,()=>console.log('server started 3000'));
const io = socketio(server);
io.on('connection',(socket)=>{
    console.log('Connected')
    io.on('disconnect',()=>{
        console.log('Disconnected')
    })
})