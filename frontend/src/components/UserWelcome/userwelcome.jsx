import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userwelcome.css";
import { PostUserProfile } from "../../actions/post.userprofile.action";
import EditName from "../EditName/EditName";

const UserWelcome = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.UserReducer.userProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(PostUserProfile());
  }, [dispatch]);

  return (
    <div className="header">
      {isEditing ? (
        <EditName setIsEditing={setIsEditing} />
      ) : (
        <>
          <h1>
            Welcome back
            <br />
            {userProfile.userName} !
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