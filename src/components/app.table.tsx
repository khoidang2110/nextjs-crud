"use client";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import CreateModal from "./create.modal";
import { useState } from "react";
import EditModal from "./edit.modal";
import DeleteModal from "./delete.modal";

import Link from "next/link";

interface IProps {
  blogs: IBlog[];
}

const TableExample = (props: IProps) => {
  const { blogs } = props;
  console.log("blogs", blogs);

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const [blog, setBlog] = useState<any>("");
  console.log("blog", blog);
  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table Blogs</h3>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
          Add New
        </Button>
      </div>
      <Table size="sm" bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  
                    <Link className="btn btn-primary" href={`/blogs/${item.id}`}>View</Link>
               
                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => {
                      setShowModalEdit(true);
                      setBlog(item);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShowModalDelete(true);
                      setBlog(item);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <EditModal
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
        blog={blog}
        setBlog={setBlog}
      />
      <DeleteModal
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
};

export default TableExample;
