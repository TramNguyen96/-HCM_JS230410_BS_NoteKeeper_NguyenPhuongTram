"use strict";
class Note {
    constructor(content, id = Date.now() * Math.random()) {
        this.content = content;
        this.id = id;
    }
}
class NoteManager {
    constructor() {
        var _a;
        let notesLocal = JSON.parse((_a = (localStorage.getItem("Notes"))) !== null && _a !== void 0 ? _a : "[]");
        let notesTemp = [];
        for (let i in notesLocal) {
            notesTemp.push(new Note(notesLocal[i].note, notesLocal[i].id));
        }
        this.notes = notesTemp;
        this.renderNote();
    }
    createNote(newNote) {
        this.notes.push(newNote);
        localStorage.setItem("Notes", JSON.stringify(this.notes));
        this.renderNote();
    }
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id != id);
        localStorage.setItem("Notes", JSON.stringify(this.notes));
        this.renderNote();
    }
    renderNote() {
        let renderEl = document.getElementById("render_location");
        let trString = ``;
        this.notes.map((note, index) => {
            trString +=
                `
            <li>
                <div class="yellow-bg" style="width: 170px; height: 120px;">
                    <p>${index + 1}</p>
                    <h4>${note.content}</h4>
                    <a href="#" class="text-danger pull-right"
                        onclick="deleteNote(${note.id})"
                    ><i class="fa fa-trash-o "></i></a>
                </div>
            </li>

            `;
            return note;
        });
        console.log("notes", this.notes);
        renderEl.innerHTML = trString;
    }
}
let notes = new NoteManager();
function addNote() {
    const textValue = document.getElementById("textArea").value;
    let newNote = new Note(textValue);
    notes.createNote(newNote);
    document.getElementById("textArea").value = "";
}
function deleteNote(id) {
    notes.deleteNote(id);
}
