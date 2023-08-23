class Note{
    content: string;
    id: number;

    constructor(content: string, id: number = Date.now() * Math.random()){
        this.content = content;
        this.id = id;
        
    }
}

class NoteManager{
    notes: Note[]

    constructor(){
         let notesLocal = JSON.parse((localStorage.getItem("Notes")) ?? "[]");

        let notesTemp = []

        for (let i in notesLocal) {
            notesTemp.push(new Note(notesLocal[i].note, notesLocal[i].id))
        }

        this.notes = notesTemp

        this.renderNote();
    }

    createNote(newNote: Note){
        this.notes.push(newNote)
        localStorage.setItem("Notes", JSON.stringify(this.notes))
        this.renderNote();
    }
    
    deleteNote(id: number) {
        this.notes = this.notes.filter(note => note.id != id);

        localStorage.setItem("Notes", JSON.stringify(this.notes));
        this.renderNote();
    }

    renderNote(): void{
        let renderEl = document.getElementById("render_location")
        
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

            `
            return note;
        })

        console.log("notes", this.notes);
        (renderEl as HTMLElement).innerHTML = trString;
        
    }
}

let notes = new NoteManager()

function addNote(){
    const textValue = (document.getElementById("textArea") as HTMLTextAreaElement).value;

    let newNote = new Note(textValue);
    notes.createNote(newNote);

    (document.getElementById("textArea") as HTMLTextAreaElement).value = "";
}

function deleteNote(id: number){
    notes.deleteNote(id);
}
