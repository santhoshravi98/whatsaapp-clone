import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton, } from '@material-ui/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider'
import firebase from 'firebase/app';




function Chat() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();


    const [seed, setSeed] = useState('');
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const { roomId } = useParams();
    console.log(roomId);
    const [roomName, setRoomName] = useState('');


    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    };

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapShot => (
                setRoomName(snapShot.data().name)
            ))
            db.collection('rooms').doc(roomId).collection('messages').orderBy("timestamp", "asc").onSnapshot((snapShot) =>
                setMessages(snapShot.docs.map((doc) => doc.data()))
            );
        }
        console.log(roomId)

    }, [roomId]);

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar
                    src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen {new Date(messages[messages.length - 1]?.timestamp?.toDateString()).toUTCString()}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>
            <div className="chat__body">
                {messages.map((mes) => (
                    <p className={`chat__message ${mes.name === user.displayName && 'chat__receiver'}`}>
                        <span className="chat__name">{mes.name}</span>
                        {mes.message}
                        <span className="chat__timestamp">
                            {new Date(mes?.timestamp?.toDateString()).toUTCString()}
                        </span>
                    </p>
                ))}

            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" placeholder="Enter a message" value={input} onChange={(e) => { setInput(e.target.value) }} />
                    <button type='submit' onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
