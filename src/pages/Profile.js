import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import NavBar from "../components/NavBar/NavBar";
import { FaCamera } from 'react-icons/fa';

function Profile() {
  const [userDetails, setUserDetails] = useState({
    studentNumber: "",
    firstName: "",
    lastName: "",
    currentYear: "",
    email: "",
    bio: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails({ ...docSnap.data(), bio: docSnap.data().bio || "" });
            if (docSnap.data().photoUrl) setAvatarPreview(docSnap.data().photoUrl);
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        // TODO: Upload avatar to storage and get URL if avatar is changed
        await updateDoc(docRef, {
          studentNumber: userDetails.studentNumber,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          currentYear: userDetails.currentYear,
          bio: userDetails.bio
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
    <>
      <NavBar />
      <div className="min-h-[70vh] flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 py-8">
        <div className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center border border-neutral-200 dark:border-neutral-700">
          {/* Avatar Section */}
          <div className="relative flex flex-col items-center">
            <div className="relative group">
              <img
                src={avatarPreview || '/default-avatar.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md bg-gray-200 dark:bg-neutral-700"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-white/90 dark:bg-neutral-800/90 rounded-full p-2 cursor-pointer shadow group-hover:bg-primary/10 transition border border-primary">
                  <FaCamera className="text-xl text-primary" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white text-center">
              {userDetails.firstName} {userDetails.lastName}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">{userDetails.email}</p>
          </div>

          {/* Details Section */}
          <div className="flex-1 w-full">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Student Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userDetails.studentNumber}
                    onChange={e => setUserDetails({ ...userDetails, studentNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                ) : (
                  <div className="text-neutral-700 dark:text-neutral-200">{userDetails.studentNumber}</div>
                )}
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userDetails.firstName}
                      onChange={e => setUserDetails({ ...userDetails, firstName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  ) : (
                    <div className="text-neutral-700 dark:text-neutral-200">{userDetails.firstName}</div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userDetails.lastName}
                      onChange={e => setUserDetails({ ...userDetails, lastName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  ) : (
                    <div className="text-neutral-700 dark:text-neutral-200">{userDetails.lastName}</div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Current Year</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userDetails.currentYear}
                    onChange={e => setUserDetails({ ...userDetails, currentYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                ) : (
                  <div className="text-neutral-700 dark:text-neutral-200">{userDetails.currentYear}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Bio</label>
                {isEditing ? (
                  <textarea
                    value={userDetails.bio}
                    onChange={e => setUserDetails({ ...userDetails, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none min-h-[60px]"
                  />
                ) : (
                  <div className="text-neutral-700 dark:text-neutral-400 whitespace-pre-line">{userDetails.bio || <span className='italic text-neutral-400'>No bio yet.</span>}</div>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`px-5 py-2 rounded-lg font-semibold shadow transition-colors duration-200 ${isEditing ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-primary hover:bg-primary/90 text-white'}`}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2 rounded-lg font-semibold shadow bg-neutral-200 hover:bg-neutral-300 text-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;