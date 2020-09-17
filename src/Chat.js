import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

const Chat = () => {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [message, setMessage] = useState([]);
    const [{ user }, dispatch] = useStateValue();


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    useEffect(() => {
        console.log(roomName)
        if (roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) =>
                    setRoomName(snapshot.data().name))

            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => (setMessage(snapshot.docs.map(doc => doc.data()))))

        }

    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed >>>>', input);
        db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setInput('')
    };

    console.log(message.timestamp);


    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    
                    <p>Last seen {new Date(message[message.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                    
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
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
                {message.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && `chat__reciever`}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}


            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        type="text"
                        placeholder="Type a message" />
                    <button
                        onClick={sendMessage}
                        type="submit">
                        Send message</button>
                </form>
                <MicIcon />

            </div>

        </div>
    )
}

export default Chat
