import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from '../firebase';
import './SidebarChat.css'
import {Link} from 'react-router-dom'
function SidebarChat({ id,Name,addNewChat }) {
    const [seed, setSeed] = useState('');
    const [messages,setMessages]=useState([])
    useEffect(() =>{
        if(id){
            db.collection('Rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))

            )) 
        }

    },[])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const createChat = () => {
        const roomName = prompt("Please Enter name for chat");
        if (roomName) {
            db.collection("Rooms").add({
                Name:roomName
            })
        }

    }


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>{Name}</h2>
    <p title={messages[0]?.message.slice(0,15)}>{messages[0]?.message.slice(0,15)} {messages[0]?.message.length> 15 ?"...":""}</p>
            </div>
        </div>
        
        </Link>
        
    ) :
        (
            <div onClick={createChat} className="sidebarChat">
                <h2>Add New Chat</h2>
            </div>
        )
}

export default SidebarChat
