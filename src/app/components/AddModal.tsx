import React, { useState } from "react";
import { useFormik } from "formik";
import { AddProductModalValidator } from "./../../Shared/Validators";
import { FormikValidator } from "../../Shared";
import { FormikErrorMessage } from "./FormikErrorMessage";
import Modal from "react-bootstrap/Modal";
import { API } from "../../Api";
import { ProductsListThunk } from "../../Thunk";
import { useDispatch } from "../../Store";

interface Props {
  open: boolean;
  onClose: () => void;
}
function AddModal(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const AddProductValidation = useFormik<AddProductModalValidator>({
    initialValues: {
      name: "",
      image: "",
    },
    onSubmit: (values) => {
      API.Products.create(values)
        .then((response) => {
          props.onClose();
          AddProductValidation.resetForm();
          dispatch(ProductsListThunk());
        })
        .catch((error) => {
          console.log(error);
        });
    },

    validate: FormikValidator.validator(AddProductModalValidator),
  });
  return (
    <>
      <Modal show={props.open} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill The Field</Modal.Title>
        </Modal.Header>
        <form onSubmit={AddProductValidation.handleSubmit}>
          <div className="p-4">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              onBlur={AddProductValidation.handleBlur}
              onChange={AddProductValidation.handleChange}
            />
            <FormikErrorMessage
              name="name"
              formik={AddProductValidation}
              render={(error) => (
                <span className="error text-danger">{error}</span>
              )}
            />
          </div>
          <div className="p-4">
            <input
              className="form-control"
              type="text"
              name="image"
              placeholder="Image"
              onBlur={AddProductValidation.handleBlur}
              onChange={AddProductValidation.handleChange}
            />
            <FormikErrorMessage
              name="image"
              formik={AddProductValidation}
              render={(error) => (
                <span className="error text-danger">{error}</span>
              )}
            />
          </div>
          <div className="p-4">
            <button className="btn btn-primary w-100" type="submit">
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddModal;
