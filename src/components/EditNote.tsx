import GoBack from './GoBack'
import { NoteData, Tag } from "../App";
import { useNote } from "./NoteLayout";
import NoteForm from "./NoteForm";

type UpdatenoteProps = {
  onSubmit: (id:string,data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  avaialableTags: Tag[];
};

const EditNote = ({onSubmit,onAddTag,avaialableTags}:UpdatenoteProps) => {
  const note = useNote();


  return (
    <>
      <GoBack isEditPage={true} />
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        id={note.id}
        onSubmit={data => onSubmit(note.id, data)} 
        onAddTag={onAddTag}
        avaialableTags={avaialableTags}
      />
    </>
  )
}

export default EditNote
