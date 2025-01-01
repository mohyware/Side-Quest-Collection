/*************************************************************************
 * Create Note Popup Logic
 **************************************************************************/


function popup() {

    const popupContainer = document.createElement("div");

    popupContainer.innerHTML = `
    <div id="popupContainer">
        <h1>New Note</h1>
        <textarea id="note-text" placeholder="Enter your note..."></textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="createNote()">Create Note</button>
            <button id="closeBtn" onclick="closePopup()">Close</button>
        </div>
    </div>
    `;
    document.body.appendChild(popupContainer);
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if(popupContainer) {
        popupContainer.remove();
    }
}

 function createNote() {
    // get written text
    const popupContainer = document.getElementById('popupContainer');
    const noteText = document.getElementById('note-text').value;
    if(!noteText){
        alert("u have to write something");
        return;
    }
    // asign it with body
    Title ='Title';
    Body = noteText;
    createdBy ='admin';
    // create note
    (async () => {
        const rawResponse = await fetch('/api/v1', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Title , Body ,createdBy})
        });
        const content = await rawResponse.json();
        
        console.log(content);
    })();
    
    // remove it again for new one
    document.getElementById('note-text').value = '';

    popupContainer.remove();
    displayNotes();
}


/*************************************************************************
 * Display Notes Logic
 **************************************************************************/

async function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    // get all notes
    const data = await fetch('/api/v1')
    const records = await data.json()
    //print each note and send its fake id (Created At) to delete and edit functions
    records.Notes.forEach(note => {
        const id =Number( (note.createdAt).replace(/\D/g,'') );
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${note.Body}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        notesList.appendChild(listItem);
    })
    
}

/*************************************************************************
 * Edit Note Popup Logic
 **************************************************************************/

async function editNote(noteId) {
    const data = await fetch('/api/v1')
    // get all notes
    const records = await data.json()
    const notes = records.Notes;
    // get note createdAt fake id
    const noteToEdit = notes.find(note => Number( (note.createdAt).replace(/\D/g,'') ) == noteId);
    // get text 
    const noteText = noteToEdit ? noteToEdit.Body : '';
    // show it
    const editingPopup = document.createElement("div");
    editingPopup.innerHTML = `
    <div id="editing-container" data-note-id="${noteId}">
    <h1>Edit Note</h1>
    <textarea id="note-text">${noteText}</textarea>
    <div id="btn-container">
    <button id="submitBtn" onclick="updateNote()">Done</button>
    <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
    </div>
    </div>
    `;
    
    document.body.appendChild(editingPopup);
    }

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");

    if(editingPopup) {
        editingPopup.remove();
    }
}

async function updateNote() {
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if(!noteText){
        alert("u have to write something");
        return
    }

    if (noteText !== '') {
        const noteId = editingPopup.getAttribute('data-note-id');
        // get all notes
        const data = await fetch('/api/v1')
        const records = await data.json()
        const notes = records.Notes;
        // search note with created at id
        const updatedNote = notes.find(note => Number( (note.createdAt).replace(/\D/g,'') ) == noteId);
        // asign id
        const note_id = updatedNote ? updatedNote._id : '';
        // update note
        await fetch(`/api/v1/${note_id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Body: noteText }),
            })

        // Close the editing popup
        editingPopup.remove();

        // Refresh the displayed notes
        displayNotes();
    }
}

/*************************************************************************
 * Delete Note Logic
 **************************************************************************/

async function deleteNote(noteId) {
    // get all notes
    const data = await fetch('/api/v1')
    const records = await data.json()
    const notes = records.Notes;
    // search note with created at
    const noteToDelete = notes.find(note => Number( (note.createdAt).replace(/\D/g,'') ) == noteId);
    // asign id
    const note_id = noteToDelete ? noteToDelete._id : '';
    // delete api
    await fetch(`/api/v1/${note_id}`, {
        method: 'DELETE'
      })
    // display again
      displayNotes();
}

displayNotes();
