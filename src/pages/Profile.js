import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import NavBar from "../components/NavBar/NavBar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import { storage } from "../firebase"; // Ensure Firebase Storage is initialized in your firebase.js file

function Profile() {
  const [userDetails, setUserDetails] = useState({
    studentNumber: "",
    firstName: "",
    lastName: "",
    currentYear: "",
    email: "",
    profilePicture: "", // Add profilePicture field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // State for upload status

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
          profilePicture: userDetails.profilePicture, // Save profile picture URL
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

const handleProfilePictureUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);
  try {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result; // Base64 string of the image

      // Update the profile picture URL in state
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        profilePicture: base64String,
      }));

      // Save the Base64 string in Firestore
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, { profilePicture: base64String });
      }
    };

    reader.readAsDataURL(file); // Convert the file to a Base64 string
  } catch (error) {
    console.error("Error uploading profile picture:", error);
  } finally {
    setUploading(false);
  }
};

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md flex space-x-6 mt-6">
        {/* Profile Picture Section */}
        <div className="flex-shrink-0 h-32 w-32 rounded-full border bg-gray-200 flex items-center justify-center shadow-lg relative">
          {userDetails.profilePicture ? (
            <img
            src={userDetails.profilePicture}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <p
              className="text-gray-700 font-bold text-center text-lg"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Profile Picture
            </p>
          )}
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="absolute bottom-0 left-0 w-full opacity-0 cursor-pointer"
            />
          )}
        </div>

        {/* Profile Details Section */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-4">
            {userDetails.firstName} {userDetails.lastName}
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Email:</label>
              <p className="text-gray-600">{userDetails.email}</p>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Student Number:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userDetails.studentNumber}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      studentNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              ) : (
                <p className="text-gray-600">{userDetails.studentNumber}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                First Name:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userDetails.firstName}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              ) : (
                <p className="text-gray-600">{userDetails.firstName}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Last Name:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userDetails.lastName}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              ) : (
                <p className="text-gray-600">{userDetails.lastName}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Current Year:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userDetails.currentYear}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      currentYear: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              ) : (
                <p className="text-gray-600">{userDetails.currentYear}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;