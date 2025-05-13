import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Profile() {
  const [userDetails, setUserDetails] = useState({
    studentNumber: "",
    firstName: "",
    lastName: "",
    currentYear: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          studentNumber: userDetails.studentNumber,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          currentYear: userDetails.currentYear,
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div>
        <label className="block font-medium">Email:</label>
        <p className="text-gray-600">{userDetails.email}</p>
      </div>
      <div>
        <label className="block font-medium">Student Number:</label>
        {isEditing ? (
          <input
            type="text"
            value={userDetails.studentNumber}
            onChange={(e) =>
              setUserDetails({ ...userDetails, studentNumber: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        ) : (
          <p className="text-gray-600">{userDetails.studentNumber}</p>
        )}
      </div>
      <div>
        <label className="block font-medium">First Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={userDetails.firstName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, firstName: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        ) : (
          <p className="text-gray-600">{userDetails.firstName}</p>
        )}
      </div>
      <div>
        <label className="block font-medium">Last Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={userDetails.lastName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, lastName: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        ) : (
          <p className="text-gray-600">{userDetails.lastName}</p>
        )}
      </div>
      <div>
        <label className="block font-medium">Current Year:</label>
        {isEditing ? (
          <input
            type="text"
            value={userDetails.currentYear}
            onChange={(e) =>
              setUserDetails({ ...userDetails, currentYear: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        ) : (
          <p className="text-gray-600">{userDetails.currentYear}</p>
        )}
      </div>
      <button
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
}

export default Profile;