import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./editName.css";
import { putUserNameAsync } from "../../features/user/userSlice"; 

const EditName = ({ setIsEditing }) => {
  // Récupère la fonction dispatch du store Redux
  const dispatch = useDispatch();
  // Sélectionne les données de l'utilisateur à partir du store Redux
  const userProfile = useSelector((state) => state.user.userProfile); 

  // Initialise une variable d'état pour le nouveau nom d'utilisateur
  const [newUserName, setNewUserName] = useState("");

  // Fonction appelée lorsque l'utilisateur clique sur "Save" pour changer le nom d'utilisateur
  const handlechangeUserName = async () => {
    if (newUserName) {
      // Dispatche une action Redux pour changer le nom d'utilisateur
      await dispatch(putUserNameAsync(newUserName));
      setIsEditing(false);
      setNewUserName("");
    }
  };

  // Fonction appelée lorsque l'utilisateur clique sur "Cancel" pour annuler les modifications
  const handleCancel = () => {
    // Réinitialise le champ de saisie du nouveau nom d'utilisateur et masque le formulaire d'édition
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
