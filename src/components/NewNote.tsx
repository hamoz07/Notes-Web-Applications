import NoteForm from "./NoteForm";
import { NoteData, Tag } from "../App";
import GoBack from "./GoBack";

type NEWnoteProps = {
  whenCreation: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  avaialableTags: Tag[];
};

const NewNote = ({ whenCreation, onAddTag, avaialableTags }: NEWnoteProps) => {
  return (
    <>
    <GoBack isEditPage={false}/>
      <h1>New Note</h1>
      <NoteForm 
        onSubmit={whenCreation} 
        onAddTag={onAddTag}
        avaialableTags={avaialableTags}
      />
    </>
  );
};

export default NewNote;
