"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import {mutate} from "swr";
interface IProps {
  showModalEdit: boolean;
  setShowModalEdit: (value: boolean) => void;
  setBlog:(value:string)=>void;
  blog:Blog;
}
interface Blog {
    title:string;
    author:string;
    content:string;
    id:number;
}

function EditModal(props: IProps) {
  const { showModalEdit, setShowModalEdit,setBlog ,blog} = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

useEffect(() => {
    setTitle(blog.title);
    setAuthor(blog.author);
    setContent(blog.content);
}, [blog]);


  const handleSubmit = () => {
if(!title){
    toast.error("not empty title !")
    return;
}
if(!author){
    toast.error("not empty author !")
    return;
}
if(!content){
    toast.error("not empty content !")
    return;
}

    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("update blog succeed");
          handleCloseModal();
          mutate("http://localhost:8000/blogs");
        }
      });

  };

  const handleCloseModal = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setShowModalEdit(false);
    setBlog("");
  };
  return (
    <>
      <Modal
        show={showModalEdit}
        onHide={() => setShowModalEdit(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
