import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  avaialableTags: Tag[];
} & Partial<NoteData> & Partial<{id:string}>;

const NoteForm = (
  { onSubmit, onAddTag, avaialableTags, title = "", markdown = "", tags = [], id}: NoteFormProps
) => {
  const refOfTit = useRef<HTMLInputElement>(null);
  const refOfTEXTAREA = useRef<HTMLTextAreaElement>(null);
  const [mytags, setmyTags] = useState<Tag[]>(tags);
  const nav = useNavigate();
  

  const submitNote = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: refOfTit.current!.value,
      markdown: refOfTEXTAREA.current!.value,
      tags: mytags,
    });
    nav(title === "" ? "/" : `/${id}`);
  };

  return (
    <>
      <Form onSubmit={submitNote}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required ref={refOfTit} defaultValue={title} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label };
                    onAddTag(newTag);
                    setmyTags(prev => [...prev, newTag]);
                  }}
                  value={mytags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  options={avaialableTags.map(tag => {
                    return { label: tag.label, value: tag.id }
                  })}
                  onChange={(tags) => {
                    setmyTags(
                      tags.map((tag) => ({
                        label: tag.label,
                        id: tag.value,
                      }))
                    );
                  }}
                  isMulti
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={15}
              ref={refOfTEXTAREA}
              defaultValue={markdown}
            />
          </Form.Group>
          <Stack direction="horizontal" className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Stack>
        </Stack>
      </Form>
    </>
  );
};

export default NoteForm;
