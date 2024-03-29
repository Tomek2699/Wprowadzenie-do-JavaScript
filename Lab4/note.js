export class Note {

    SaveNote(note){
        note.id = this.CreateUUID()
        console.log(note)
        const notes = this.GetNotes()
        notes.push(note)
        console.log(note)
        localStorage.setItem("notes", JSON.stringify(notes))
        return note
    }

    UpdateNote(note){
        const oldNote = this.GetNote(note.id)
        note.date = oldNote.date
        this.DeleteNote(note.id)
        return this.SaveNote(note)

    }

    DeleteNote(id){
        const notes = this.GetNotes()
        const updatedNotes = notes.filter(function(note){return (note.id!=id);})
        localStorage.setItem("notes", JSON.stringify(updatedNotes))
    }

    GetNotes(){
        const notes = JSON.parse(localStorage.getItem('notes'));
        if (notes == null) {
            return []
        }
        return notes
    }

    GetNote(id){
        const notes = this.GetNotes()
        return notes.filter(function(note){return (note.id==id);})[0]
    }

    GetNewId(){
        const notes = this.GetNotes();
        let maxId = 0;
        notes.forEach(element => {
            if (element.id > maxId) {
                maxId = element.id
            }
        });
        return maxId + 1;
    }

    CreateUUID() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
    }
}
