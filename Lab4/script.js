import { Note } from "./note.js";

document.addEventListener("DOMContentLoaded", function(){
    AddAllNotesToView()
});

document.querySelector("#AddNoteHeaderButton").addEventListener('click', AddNewNote);
document.querySelector('#DetailNoteCancelButton').addEventListener('click', HideNoteCreator)
document.querySelector('#DetailNoteSaveButton').addEventListener('click', NoteCreatorSaveNote)
document.querySelector('#DetailNoteDeleteButton').addEventListener('click', NoteCreatorDeleteNote)
document.querySelector('#colorpicker').addEventListener('input', ChangeNoteCreatorColor)

let IdOfNoteToEditOrDelete

function ChangeNoteCreatorColor(){
    document.querySelector('.DetailNoteContainer').style.backgroundColor = document.querySelector('#colorpicker').value
}


function AddNewNote(){
    IdOfNoteToEditOrDelete = 'empty'
    document.querySelector('#DetailNoteTitle').value = ""
    document.querySelector('#textContent').value = ""
    document.querySelector('#colorpicker').value = '#F4FF39'
    document.querySelector('#DetailNotePinned').checked = false
    document.querySelector('.DetailNoteContainer').style.backgroundColor = '#F4FF39'
    ShowNoteCreator()
}

function ShowNoteCreator(){
    document.querySelector('.DetailNoteBG').style.visibility = "visible";
}

function HideNoteCreator(){
    document.querySelector('.DetailNoteBG').style.visibility = "hidden";
}

function NoteCreatorSaveNote(){
    if (IdOfNoteToEditOrDelete == 'empty') {
        const note = new Note()
        note.title = document.querySelector('#DetailNoteTitle').value
        note.content = document.querySelector('#textContent').value
        note.colour = document.querySelector('#colorpicker').value
        note.pinned = document.querySelector('#DetailNotePinned').checked
        note.date = new Date().toISOString()
        const newNote = note.SaveNote(note)
        HideNoteCreator()
        AddNoteToView(newNote)
    }
    else{
        const note = new Note()
        note.id = IdOfNoteToEditOrDelete
        note.title = document.querySelector('#DetailNoteTitle').value
        note.content = document.querySelector('#textContent').value
        note.colour = document.querySelector('#colorpicker').value
        note.pinned = document.querySelector('#DetailNotePinned').checked

        const newNote = note.UpdateNote(note)
        HideNoteCreator()
        RemoveNoteFromView()
        AddNoteToView(newNote)
    }
}

function NoteCreatorEditNote(element){
    const fullId = element.target.id
    const id = fullId.split('note-')[1]
    IdOfNoteToEditOrDelete = id
    const newNote = new Note()
    const note = newNote.GetNote(id)
    console.log(note)

    document.querySelector('#DetailNoteTitle').value = note.title
    document.querySelector('#textContent').value = note.content
    document.querySelector('#colorpicker').value = note.colour
    document.querySelector('#DetailNotePinned').checked = note.pinned
    document.querySelector('.DetailNoteContainer').style.backgroundColor = note.colour

    ShowNoteCreator()

}

function NoteCreatorDeleteNote(){
    if (IdOfNoteToEditOrDelete != 'empty') {
        const note = new Note()
        note.DeleteNote(IdOfNoteToEditOrDelete)
        RemoveNoteFromView()
        HideNoteCreator()
    }
}

function AddAllNotesToView(){
    const note = new Note()
    const notes = note.GetNotes()
    notes.forEach(note => {
        AddNoteToView(note)
    });
}

function RemoveNoteFromView(){
    let node = document.getElementById(`note-${IdOfNoteToEditOrDelete}`);
    if (node.parentNode) {
    node.parentNode.removeChild(node);
    }
}

function AddNoteToView(note){
    const newNote = document.querySelector('#hiddenNote')
    const cloneNote = newNote.cloneNode(true);
    cloneNote.style.backgroundColor = note.colour;
    cloneNote.style.boxShadow = '5px 5px 10px rgba(0,0,0,0.5)';
    cloneNote.setAttribute('id', `note-${note.id}` );
    cloneNote.querySelector('.NoteTitle').innerText = note.title
    cloneNote.querySelector('.NoteDate').innerText = note.date
    cloneNote.querySelector('.NoteContent').innerText = note.content
    if (note.pinned) {
        document.querySelector('#PinnedNotesContainer').appendChild(cloneNote)
    }
    else{
        document.querySelector('#RegularNotesContainer').appendChild(cloneNote)
    }
    cloneNote.addEventListener('click', NoteCreatorEditNote)
}