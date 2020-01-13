import React, { Fragment, useState } from "react";
import axiosinstance from "../../../../../../axios-todo";

import { createErrorMessage } from "../../../../../../utils/errorHandler";

const UploadAvatar = props => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (file == null) {
      setError("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    try {
      let result = await axiosinstance.post(
        "api/user/" + props.userId + "/avatar/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      props.onAvatarChange(result.data);
    } catch (err) {
      setError(createErrorMessage(err));
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input type="file" name="avatar" id="avatar" onChange={handleChange} />
        <input type="submit" value="Upload" />
      </form>
      <div>{error}</div>
    </Fragment>
  );
};
export default UploadAvatar;
