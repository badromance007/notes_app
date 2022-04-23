import './App.css';
import { data } from './seeds/data';
import Split from 'react-split';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar'; 
import Editor from './components/Editor';
import {nanoid} from 'nanoid';

function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || [])
  const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || '')

  useEffect(() => {
    document.title = 'Notes App'
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])


  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "Note's title",
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  function updateNote(text) {
    setNotes(oldNotes => {
      const newArray = []
      for(let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i]
        if (oldNote.id === currentNoteId) {
          newArray.unshift({...oldNote, body: text})
        } else {
          newArray.push(oldNote)
        }
      }
      return newArray
    })
  }

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id != noteId))
  }

  return (
    <main>
      {
        notes.length > 0
        ?
        <Split
          sizes={[30, 70]}
          className='split'
        >
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {
            currentNoteId &&
            notes.length > 0 &&
            <Editor
              currentNote={findCurrentNote()}
              updateNote={updateNote}
            />
          }
        </Split>
        :
        <div className='no-notes'>
          <h1>You have no notes</h1>
          <button
            className='first-note'
            onClick={createNewNote}
          >
            Create one now
          </button>
        </div>
      }
    </main>
  );
}

export default App;
