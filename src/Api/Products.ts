import { axiosInstance } from "./axios-Instance";
import { AxiosPromise } from "axios";
import { AddProductModalValidator, ProductInterface } from "../Shared";
import { EditProductModalValidator } from "../Shared/Validators/EditProductModalValidator";

export class Products {
  // create url
  static create(
    data: AddProductModalValidator
  ): AxiosPromise<ProductInterface> {
    return axiosInstance({
      url: "create",
      method: "post",
      data,
    });
  }

  // list url
  static list(): AxiosPromise<ProductInterface[]> {
    return axiosInstance({
      url: "read",
      method: "get",
    });
  }

  // update record
  static updateById(
    id: string,
    data: EditProductModalValidator
  ): AxiosPromise<ProductInterface> {
    return axiosInstance({
      url: `update/${id}`,
      method: "put",
      data,
    });
  }

  // delete record
  static deleteById(id: string): AxiosPromise<ProductInterface> {
    return axiosInstance({
      url: `delete/${id}`,
      method: "delete",
    });
  }
}
