import React from "react";
import { useNote } from "./NoteLayout";
import { Col, Row, Stack, Badge, Button } from "react-bootstrap";
import GoBack from "./GoBack";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NoteDetailsProps = {
  DeleteNote: (id: string) => void;
};

const NoteDetails = ({ DeleteNote }: NoteDetailsProps) => {
  const note = useNote();
  const nav = useNavigate();
  return (
    <>
      <GoBack isEditPage={false} />
      <Row>
        <Col>
          <h3>{note.title}</h3>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className={"flex-wrap"}>
              {note.tags.map((tag) => (
                <Badge key={tag.id} className={"text-truncate"}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger"
              onClick={() => {
                DeleteNote(note.id)
                nav("/")
              }}
             >
              Delete
            </Button>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown className={"markdown"}>{note.markdown}</ReactMarkdown>
    </>
  );
};

export default NoteDetails;
