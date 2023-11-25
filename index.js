import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBDe9qRyWKoo377m7MQ-wnDZZ-InjutxTg",
    authDomain: "test1-15fd6.firebaseapp.com",
    databaseURL: "https://test1-15fd6-default-rtdb.firebaseio.com",
    projectId: "test1-15fd6",
    storageBucket: "test1-15fd6.appspot.com",
    messagingSenderId: "844739593407",
    appId: "1:844739593407:web:0e0976e353f763be04320a",
    measurementId: "G-0NJMP6GGFK"
  };
  

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// variables
var msgTxt = document.getElementById('msgTxt');
var sender;
if(sessionStorage.getItem('sender'))
{
    sender = sessionStorage.getItem('sender');
} 
else 
{
    sender = prompt('PLEASE ENTER YOUR NAME');
    sessionStorage.setItem('sender',sender);
}

// TO SEND MESSAGES
module.sendMsg = function sendMsg()
{
    var msg = textMsg.value;
    var timestamp = new Date().getTime();
    set(ref(db,"messages/"+timestamp),{
                msg : msg,
                sender : sender
            })

            textMsg.value="";
}

// TO RECEIVE MSG
onChildAdded(ref(db,"messages"), (data)=>{
if(data.val().sender == sender)
{
    messages.innerHTML += "<div style=justify-content:end class=outer id="+data.key+"><div id=inner class=meSelf>you  <br>"+data.val().msg+"</div><button id=dltMsg onclick=module.dltMsg("+data.key+")>🗑</button></div>";
} 
else 
{
    messages.innerHTML += "<div class=outer id="+data.key+"><div id=inner class=notMes>"+data.val().sender+"  <br>"+data.val().msg+"</div></div>";
}
})




// TO DELETE MSG
module.dltMsg = function dltMsg(key)
{
    remove(ref(db,"messages/"+key));
}

// WHEN MSG IS DELETED
onChildRemoved(ref(db,"messages"),(data)=>{
            var msgBox = document.getElementById(data.key);
            messages.removeChild(msgBox);
        })