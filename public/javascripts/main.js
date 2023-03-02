const noteForm = document.querySelector('#noteForm')
const title = document.querySelector('#title')
const description = document.querySelector('#description')


noteForm.addEventListener('submit', e => {
    e.preventDefault()
    //console.log('Enviando...')

    if (savedId) {
        updateNote(savedId, title.value, description.value)
    } else {
        saveNotes(title.value, description.value)
    }

    title.value = ''
    description.value = ''

})