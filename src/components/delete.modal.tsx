"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import {mutate} from "swr";
interface IProps {
  showModalDelete: boolean;
  setShowModalDelete: (value: boolean) => void;
  setBlog:(value:string)=>void;
  blog:Blog;
}
interface Blog {
    title:string;
    author:string;
    content:string;
    id:number;
}

function DeleteModal(props: IProps) {
  const { showModalDelete, setShowModalDelete,setBlog ,blog} = props;

  const [title, setTitle] = useState<string>("");


useEffect(() => {
    setTitle(blog.title);
 
}, [blog]);


  const handleSubmit = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          console.log("Blog id",blog.id)
          toast.success("Delete blog succeed");
          handleCloseModal();
          mutate("http://localhost:8000/blogs");
        }
      });

  };

  const handleCloseModal = () => {
    setTitle("");
    setShowModalDelete(false);
    setBlog("");
  };
  return (
    <>
      <Modal
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete blog name: {title}</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
