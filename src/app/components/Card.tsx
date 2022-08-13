import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../Store";
import { ProductsListThunk } from "../../Thunk";
import { ProductInterface } from "../../Shared";
import { EditCardModal } from "./EditCardModal";
import { DeleteModal } from "./DeleteModal";

export const Card = () => {
  const [editProductDialog, setEditProductDialog] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(null);

  // update record
  const handleShowEditProductDialog = (product: ProductInterface) => () => {
    setEditProductDialog(product);
  };
  const handleCloseEditProductDialog = () => {
    setEditProductDialog(null);
  };

  // delete record
  const handleShowDeleteProductDialog = (id: string) => () => {
    setDeleteProductDialog(id);
  };

  const handleCloseDeleteProductDialog = () => {
    setDeleteProductDialog(null);
  };

  // api integration
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(ProductsListThunk());
  }, []);

  return (
    <>
      {products.data.map((product) => (
        <div
          className="border text-center p-4 bg-info rounded-2 w-25"
          key={product.id}
        >
          <div className="card-title">
            <h3>{product.name}</h3>
            <p>{product.image}</p>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleShowEditProductDialog(product)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={handleShowDeleteProductDialog(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {!!editProductDialog && (
        <EditCardModal
          open={!!editProductDialog}
          product={editProductDialog}
          onClose={handleCloseEditProductDialog}
        />
      )}
      {!!deleteProductDialog && (
        <DeleteModal
          open={!!deleteProductDialog}
          id={deleteProductDialog}
          onClose={handleCloseDeleteProductDialog}
        />
      )}
    </>
  );
};
