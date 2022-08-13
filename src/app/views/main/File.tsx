import React, { ChangeEvent, useState } from "react";
import { API } from "../../../Api";

export function File(): JSX.Element {
  const [images, setImages] = useState<string[]>([]);
  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const { files } = target;
    if (files.length) {
      const file = files[0];
      API.Media.upload(file)
        .then((response) => {
          setImages((state) => [
            ...state,
            API.Media.getFileByName(response.data.filename),
          ]);
        })
        .catch(console.log);
    }
  };

  const handleRemoveImage = (image: string) => () => {
    setImages((state) => state.filter((item) => item !== image));
  };

  return (
    <div>
      <div className="file-input">
        <label htmlFor="file" className="btn btn-primary">
          Browser
          <input
            type="file"
            id="file"
            name="file"
            hidden
            onChange={handleChangeFile}
          />
        </label>
      </div>

      <div className="images">
        {images.map((image, index) => (
          <div className="added-img" key={index}>
            <img src={image} alt="" className="file" />
            <button
              type="button"
              className="btn cross-icon"
              onClick={handleRemoveImage(image)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
