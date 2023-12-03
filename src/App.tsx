// libraries
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
// hooks
import { useMemo } from "react";
// components
import NewNote from "./components/NewNote";
// custom Hooks
import { useLocalStorage } from "./Custom-Hooks/useLocalStorage";
import NoteList from "./components/NoteList";
import NoteLayout from "./components/NoteLayout";
import NoteDetails from "./components/NoteDetails";
import EditNote from "./components/EditNote";

// ts types

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Note = {
  id: string;
} & NoteData;

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);
  //

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [tags, notes]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevnotes) => [
      ...prevnotes,
      { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
    ]);
  }

  function onUpdateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevnotes) => {
      return prevnotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function DeleteNote(id: string) {
    setNotes((notes) => {
      return notes.filter((note) => note.id !== id);
    });
  }

  function DeleteTag(id: string) {
    setTags((tag) => {
      return tag.filter((tag) => tag.id !== id);
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }
  //

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              avaialableTags={tags}
              Notes={notesWithTags}
              DeleteTag={DeleteTag}
              onUpdateTag={onUpdateTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onAddTag={addTag}
              avaialableTags={tags}
              whenCreation={onCreateNote}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NoteDetails DeleteNote={DeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                avaialableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
