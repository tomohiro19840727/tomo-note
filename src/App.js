import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  },[notes])

  useEffect(() => {
   setActiveNote(notes[0].id);
  },[]);

  const onAddNote = () => {
    console.log("追加されました");
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote])
    console.log(notes);
  }

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }

  const onUpdateNote = (updatedNote) => {
    // 修正された新しいノートの配列を返す。
    const updateNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id) {
        // console.log(updatedNote); つまり書き換えたもの
        return updatedNote;
      } else {
         return note;
          // そのまま変わらないもの
      };
    });
    // console.log(updateNotesArray); これは配列としてサイドに出ている
    setNotes(updateNotesArray);
  };

  return (
    <div className="App">
      <Sidebar  onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote}  activeNote={activeNote} setActiveNote={setActiveNote} />
      <Main  activeNote={getActiveNote()}  onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
