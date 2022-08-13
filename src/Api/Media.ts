import React from "react";
import { AxiosPromise } from "axios";
import { axiosInstance } from "./axios-Instance";
import { FileUploadResponse } from "../Shared/Interfaces/media.interface";

export class Media extends React.Component {
  static upload(
    file: File,
    onUploadProgress?: (progressEvent: ProgressEvent) => void
  ): AxiosPromise<FileUploadResponse> {
    const formData = new FormData();
    formData.set("file", file);
    return axiosInstance({
      url: "media/upload",
      method: "post",
      data: formData,
      onUploadProgress,
    });
  }

  static getFileByName(filename: string): string {
    const url = new URL("http://localhost:8000/");
    url.pathname = `/media/${filename}`;
    return url.href;
  }
}
