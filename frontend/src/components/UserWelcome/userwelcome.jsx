import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userwelcome.css";
import {
  postUserProfile,
  putUserNameAsync,
} from "../../features/user/userThunks";
import EditName from "../EditName/EditName";

const UserWelcome = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(postUserProfile());
  }, [dispatch]);

  const handleEditName = (newUserName) => {
    dispatch(putUserNameAsync(newUserName));
    setIsEditing(false);
  };

  return (
    <div className="header">
      {isEditing ? (
        <EditName
          setIsEditing={setIsEditing}
          currentUserName={userProfile.userName}
          onEditName={handleEditName}
        />
      ) : (
        <>
          <h1>
            Welcome back
            <br />
            {userProfile && userProfile.userName} !
          </h1>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
          <h2 className="sr-only">Accounts</h2>
        </>
      )}
    </div>
  );
};

export default UserWelcome;
