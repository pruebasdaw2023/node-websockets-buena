const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { v4: uuidv4 } = require('uuid')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let notes = []

const app = express();

//CONFIGURACION SOCKET.IO
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Nueva conexion:', socket.id)

    socket.emit('server:loadnotes', notes)

    socket.on('client:newnote', newNote => {

        const note = {id: uuidv4(), ...newNote}
        notes.push(note)
        
        io.emit('server:newnote', note)
       
    })

    socket.on('client:deletenote', (noteId) => {
        notes = notes.filter((note) => note.id !== noteId)
        console.log(notes)

        io.emit('server:loadnotes', notes)
    })

    socket.on('client:getnote', (noteId) => {
        //console.log('Aqui',id)
        const note = notes.find(note => note.id === noteId)
        //console.log(note)

        socket.emit('server:selectednote', note)

    })

    socket.on('client:updatenote', updatedNote => {
        console.log('AQUI', updatedNote)        
        notes = notes.map(note => {
            if (note.id === updatedNote.id){
                note.title = updatedNote.title
                note.description = updatedNote.description
            }
            return note
        })
        console.log("POLLO", notes)
        io.emit('server:loadnotes', notes)
    })

    
})



app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = { app: app, server: server };
