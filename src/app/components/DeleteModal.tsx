import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ProductsListThunk, DeleteProductThunk } from "../../Thunk";
import { useDispatch } from "../../Store";

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
}

export const DeleteModal = (props: Props) => {
  const dispatch = useDispatch();
  const handleConfirmDelete = () => {
    dispatch(DeleteProductThunk(props.id));
    dispatch(ProductsListThunk());
    props.onClose();
  };
  return (
    <>
      <Modal show={props.open} onHide={props.onClose} centered>
        <div className="p-4 bg-info rounded-3">
          <h2>Are You Sure?</h2>

          <div className="float-end">
            <button
              className="btn btn-danger me-3"
              onClick={handleConfirmDelete}
            >
              Yes
            </button>
            <button className="btn btn-primary" onClick={props.onClose}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
