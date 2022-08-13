import React, { useState } from "react";
import { Card } from "../../components";
import AddModal from "../../components/AddModal";

export const Crud = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="p-4">
      <h1 className="text-center">React Crud Integration</h1>
      <div className="mb-5">
        <button className="btn btn-primary float-end" onClick={handleShow}>
          Create
        </button>
        <AddModal open={show} onClose={handleClose} />
      </div>
      <div className="d-flex flex-wrap">
        <Card />
      </div>
    </div>
  );
};
