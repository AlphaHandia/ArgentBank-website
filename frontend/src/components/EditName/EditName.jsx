import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUserNameAsync } from "../../features/user/userThunks";

const EditName = ({ setIsEditing }) => {
  const dispatch = useDispatch();
  const [newUserName, setNewUserName] = useState("");
  const userProfile = useSelector((state) => state.user.userProfile);

  const handlechangeUserName = async () => {
    if (newUserName) {
      dispatch(putUserNameAsync(newUserName));
      setIsEditing(false);
      setNewUserName("");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewUserName("");
  };

  return (
    <div className="edit-form">
      <h2>Edit User info</h2>
      <div>
        <label htmlFor="newUserName">User name :</label>
        <input
          type="text"
          id="newUserName"
          placeholder="New Username"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="firstName">First name :</label>
        <input
          type="text"
          id="firstName"
          value={userProfile.firstName}
          disabled
          className="text_input"
        />
      </div>
      <div>
        <label htmlFor="lastName">Last name :</label>
        <input
          type="text"
          id="lastName"
          value={userProfile.lastName}
          disabled
          className="text_input"
        />
        <div className="buttons-form">
          <button onClick={handlechangeUserName}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditName;
