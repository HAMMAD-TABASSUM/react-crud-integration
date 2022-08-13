import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { FormikValidator, ProductInterface } from "../../Shared";
import { EditProductModalValidator } from "../../Shared/Validators/EditProductModalValidator";
import { FormikErrorMessage } from "./FormikErrorMessage";
import { API } from "../../Api";
import { useDispatch } from "../../Store";
import { ProductsListThunk } from "../../Thunk";

interface Props {
  product: ProductInterface;
  open: boolean;
  onClose: () => void;
}

export const EditCardModal = (props: Props) => {
  const dispatch = useDispatch();
  const product = props.product;
  const EditProductValidation = useFormik<EditProductModalValidator>({
    initialValues: {
      name: product.name,
      image: product.image,
    },
    onSubmit: (values) => {
      API.Products.updateById(product.id, values)
        .then((response) => {
          console.log(response);
          props.onClose();
          dispatch(ProductsListThunk());
        })
        .catch((error) => {
          console.log(error);
        });
    },

    validate: FormikValidator.validator(EditProductModalValidator),
  });
  return (
    <>
      <Modal show={props.open} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your Card</Modal.Title>
        </Modal.Header>
        <form onSubmit={EditProductValidation.handleSubmit}>
          <div className="p-4">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="name"
              value={EditProductValidation.values.name}
              onBlur={EditProductValidation.handleBlur}
              onChange={EditProductValidation.handleChange}
            />
            <FormikErrorMessage
              name="name"
              formik={EditProductValidation}
              render={(error) => <span className="text-danger">{error}</span>}
            />
          </div>
          <div className="p-4">
            <input
              className="form-control"
              type="text"
              name="image"
              placeholder="Image"
              value={EditProductValidation.values.image}
              onBlur={EditProductValidation.handleBlur}
              onChange={EditProductValidation.handleChange}
            />
            <FormikErrorMessage
              name="image"
              formik={EditProductValidation}
              render={(error) => <span className="text-danger">{error}</span>}
            />
          </div>
          <div className="p-4">
            <button className="btn btn-primary w-100" type="submit">
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
