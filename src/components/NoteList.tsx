import { useMemo, useState } from "react";
import {
  Button,
  Col,
  Row,
  Stack,
  Form,
  Card,
  Badge,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Note, Tag } from "../App";
import styles from "./css/NoteListCard.module.css";

type NoteListProps = {
  avaialableTags: Tag[];
  Notes: Note[];
  DeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label:string) => void
};

type simpleNote = {
  id: string;
  title: string;
  tags: Tag[];
};

type EditTagsProps = {
  avaialableTags: Tag[];
  show: boolean;
  onHide: () => void;
  DeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label:string) => void
};

const NoteList = ({ avaialableTags, Notes, DeleteTag,onUpdateTag }: NoteListProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredNotes = useMemo(() => {
    return Notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (tags.length === 0 ||
          tags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, tags, Notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={"/new"}>
              <Button variant="primary">Create New</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setShowModal(true)}
            >
              Editings
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Stack gap={2} className="flex-wrap">
          <Row>
            <Col>
              {" "}
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={tags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                options={avaialableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) => {
                  // Ensure selectedTags is an array
                  setTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                  // filteredNotes.filter(note => tags.label === note.tags))
                }}
                isMulti
              />
            </Col>
          </Row>
        </Stack>
      </Form>

      <Row sx={1} sm={2} lg={3} xl={4} className="g-3 mt-2">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        avaialableTags={avaialableTags}
        show={showModal}
        onHide={() => setShowModal(false)}
        DeleteTag={DeleteTag}
        onUpdateTag={onUpdateTag}
      />
    </>
  );
};

export default NoteList;

function NoteCard({ id, title, tags }: simpleNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className={"justify-content-center flex-wrap"}
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className={"text-truncate"}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function EditTagsModal({
  avaialableTags,
  show,
  onHide,
  DeleteTag,
  onUpdateTag
}: EditTagsProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {avaialableTags.map((tag, i) => (
          <Row key={i} style={{ marginBottom: "10px" }}>
            <Col>
              <Form.Control type="text" value={tag.label} onChange={(e)=>{onUpdateTag(tag.id,e.target.value)}}/>
            </Col>
            <Col xs="auto">
              <Button variant="outline-none" onClick={() => DeleteTag(tag.id)}>
                <XCircleIcon
                  style={{ height: "24px", width: "24px", color: "red" }}
                />
              </Button>
            </Col>
          </Row>
        ))}
      </Modal.Body>
    </Modal>
  );
}
