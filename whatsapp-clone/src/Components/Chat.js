import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import './Chat.css'
import db from '../firebase'
import { useStateValue } from './StateProvider'
import {Editor} from '@tinymce/tinymce-react'
import firebase from 'firebase'
function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    //console.log(roomId);
    const [roomName, setRoomName] = useState("");
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();
    useEffect(() => {
        if (roomId) {
            db.collection('Rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().Name)
            ));
            
            db.collection("Rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) =>doc.data())));
        }

    }, [roomId])


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        console.log("You Typed :", input);
        db.collection("Rooms").doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),

        })
        setInput("");


    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen {" "}
                        {new Date(
                            messages[messages.length-1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) =>(
                    <p className={`chat__message ${ message.name===user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">
                            {message.name === user.displayName ? "You" :`${message.name}`}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
                
            </div>
            <div className="chat__footer">
                {/*
                <Editor
                apiKey="no-api-key"
                init={{
                    plugins:"emoticons",
                    toolbar:"emoticons",
                    toolbar_location:"bottom",
                    menubar:false
                }}
                />
                * */}
                <InsertEmoticon/>

               
                <form action="">
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a  message" />
                    <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                <Mic />
            </div>
        </div>


    )
}

export default Chat
