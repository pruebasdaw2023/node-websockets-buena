const socket = io()

/**
 * Guarda una nota nueva
 * @param {string} title note title save
 * @param {string} description  note description save
 */

const saveNotes = (title, description) => {
  socket.emit("client:newnote", {
    title: title,
    description: description,
  });
};

const deleteNote = id => {
  console.log(id)
  socket.emit('client:deletenote', id)
}

const getNote = id => {
  console.log(id)
  socket.emit('client:getnote', id)

}

/**
 * Actualiza una nota existente
 * @param {string} id note id update
 * @param {string} title note title update
 * @param {string} description note description update
 */
const updateNote = (id, title, description) => {
  socket.emit('client:updatenote', {
    id,
    title,
    description
  })
  //console.log(id, title, description)
}


socket.on('server:newnote', appendNote);

socket.on('server:loadnotes', renderNotes)

socket.on('server:selectednote', note => {
  //console.log(note)
  const title = document.querySelector('#title')
  const description = document.querySelector('#description')

  title.value = note.title
  description.value = note.description

  savedId = note.id
})
