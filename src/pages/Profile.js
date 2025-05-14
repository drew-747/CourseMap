import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import NavBar from "../components/NavBar/NavBar";
import { FaCamera, FaUser, FaGithub, FaLinkedin, FaGlobe, FaMoon, FaSun } from 'react-icons/fa';
import { updatePassword, updateEmail } from 'firebase/auth';

function getInitials(firstName, lastName) {
  if (!firstName && !lastName) return '';
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <button
      className="ml-4 p-2 rounded-full border border-primary bg-white dark:bg-neutral-800 text-primary dark:text-yellow-300 shadow hover:bg-primary/10 dark:hover:bg-primary/20 transition"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}

function Profile() {
  const [userDetails, setUserDetails] = useState({
    studentNumber: "",
    firstName: "",
    lastName: "",
    currentYear: "",
    email: "",
    bio: "",
    linkedin: "",
    github: "",
    website: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showAccount, setShowAccount] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [accountMsg, setAccountMsg] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails({
              ...docSnap.data(),
              bio: docSnap.data().bio || "",
              linkedin: docSnap.data().linkedin || "",
              github: docSnap.data().github || "",
              website: docSnap.data().website || ""
            });
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
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result; // Convert image to base64
      setAvatar(base64Image); // Save base64 image in state
      setAvatarPreview(base64Image); // Update preview
    };
    reader.readAsDataURL(file); // Read file as base64
  }
};

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
        bio: userDetails.bio,
        linkedin: userDetails.linkedin,
        github: userDetails.github,
        website: userDetails.website,
        photoUrl: avatar, // Save base64 image to Firestore
      });
      setIsEditing(false);
    }
  } catch (error) {
    console.error("Error updating user details:", error);
  }
};

  const handleAccountUpdate = async () => {
    setAccountMsg("");
    const user = auth.currentUser;
    try {
      if (newEmail) {
        await updateEmail(user, newEmail);
        setAccountMsg("Email updated!");
      }
      if (newPassword) {
        await updatePassword(user, newPassword);
        setAccountMsg("Password updated!");
      }
    } catch (err) {
      setAccountMsg(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-primary/5 via-white/60 to-neutral-50 dark:from-primary/10 dark:via-neutral-900/80 dark:to-neutral-900 relative overflow-x-hidden">
        {/* Soft gradient overlay for blending */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-white/60 to-primary/10 dark:via-neutral-900/80 dark:to-primary/20" style={{mixBlendMode: 'soft-light'}} />
        <div className="relative w-full max-w-2xl rounded-3xl bg-white/70 dark:bg-neutral-800/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 shadow-2xl p-8 flex flex-col md:flex-row gap-10 items-center z-10 animate-fade-in transition-all duration-500 hover:shadow-3xl">
          {/* Avatar Section */}
          <div className="flex flex-col items-center w-full md:w-auto">
            <div className="relative group animate-float">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow-lg bg-gray-200 dark:bg-neutral-700 transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
                />
              ) : (
                <div className="w-36 h-36 rounded-full flex items-center justify-center bg-gray-200 dark:bg-neutral-700 border-4 border-primary shadow-lg text-4xl font-bold text-primary transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                  {getInitials(userDetails.firstName, userDetails.lastName) || <FaUser className="text-4xl" />}
                </div>
              )}
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-white/90 dark:bg-neutral-800/90 rounded-full p-2 cursor-pointer shadow group-hover:bg-primary/10 transition border border-primary">
                  <FaCamera className="text-xl text-primary" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              )}
            </div>
            <h2 className="mt-8 text-2xl font-extrabold text-neutral-900 dark:text-white text-center tracking-tight">
              {userDetails.firstName} {userDetails.lastName}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center font-medium">{userDetails.email}</p>
            {/* Social Links */}
            <div className="flex gap-4 mt-3">
              {userDetails.linkedin && (
                <a href={userDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 text-2xl transition-colors duration-200"><FaLinkedin /></a>
              )}
              {userDetails.github && (
                <a href={userDetails.github} target="_blank" rel="noopener noreferrer" className="text-neutral-800 hover:text-black dark:text-white dark:hover:text-primary text-2xl transition-colors duration-200"><FaGithub /></a>
              )}
              {userDetails.website && (
                <a href={userDetails.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-2xl transition-colors duration-200"><FaGlobe /></a>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 w-full mt-8 md:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div className="py-2">
                <div className="font-semibold text-neutral-800 dark:text-neutral-100">Student Number</div>
                <div className="mt-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={userDetails.studentNumber}
                      onChange={e => setUserDetails({ ...userDetails, studentNumber: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  ) : (
                    <span className="text-neutral-700 dark:text-neutral-200">{userDetails.studentNumber}</span>
                  )}
                </div>
              </div>
              <div className="py-2">
                <div className="font-semibold text-neutral-800 dark:text-neutral-100">Last Name</div>
                <div className="mt-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={userDetails.lastName}
                      onChange={e => setUserDetails({ ...userDetails, lastName: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  ) : (
                    <span className="text-neutral-700 dark:text-neutral-200">{userDetails.lastName}</span>
                  )}
                </div>
              </div>
              <div className="py-2">
                <div className="font-semibold text-neutral-800 dark:text-neutral-100">First Name</div>
                <div className="mt-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={userDetails.firstName}
                      onChange={e => setUserDetails({ ...userDetails, firstName: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  ) : (
                    <span className="text-neutral-700 dark:text-neutral-200">{userDetails.firstName}</span>
                  )}
                </div>
              </div>
              <div className="py-2">
                <div className="font-semibold text-neutral-800 dark:text-neutral-100">Current Year</div>
                <div className="mt-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={userDetails.currentYear}
                      onChange={e => setUserDetails({ ...userDetails, currentYear: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  ) : (
                    <span className="text-neutral-700 dark:text-neutral-200">{userDetails.currentYear}</span>
                  )}
                </div>
              </div>
              <div className="py-2 md:col-span-2">
                <div className="font-semibold text-neutral-800 dark:text-neutral-100">Bio</div>
                <div className="mt-1">
                  {isEditing ? (
                    <textarea
                      value={userDetails.bio}
                      onChange={e => setUserDetails({ ...userDetails, bio: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none min-h-[60px]"
                    />
                  ) : (
                    <span className="text-neutral-700 dark:text-neutral-400 whitespace-pre-line italic">{userDetails.bio || <span className='italic text-neutral-400'>No bio yet.</span>}</span>
                  )}
                </div>
              </div>
              {/* Social Links Edit Fields */}
              {isEditing && (
                <div className="py-2 md:col-span-2 flex flex-col gap-2 mt-2">
                  <div className="flex gap-2 items-center">
                    <FaLinkedin className="text-blue-700 dark:text-blue-400 text-xl" />
                    <input
                      type="url"
                      placeholder="LinkedIn URL"
                      value={userDetails.linkedin}
                      onChange={e => setUserDetails({ ...userDetails, linkedin: e.target.value })}
                      required
                      className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaGithub className="text-neutral-800 dark:text-white text-xl" />
                    <input
                      type="url"
                      placeholder="GitHub URL"
                      value={userDetails.github}
                      onChange={e => setUserDetails({ ...userDetails, github: e.target.value })}
                      required
                      className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaGlobe className="text-primary text-xl" />
                    <input
                      type="url"
                      placeholder="Personal Website"
                      value={userDetails.website}
                      onChange={e => setUserDetails({ ...userDetails, website: e.target.value })}
                      required
                      className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-8 justify-center md:justify-end">
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`px-6 py-2 rounded-lg font-bold shadow transition-all duration-300 text-lg ${isEditing ? 'bg-green-600 hover:bg-green-700 text-white scale-105' : 'bg-primary hover:bg-primary/90 text-white hover:scale-105 active:scale-95'}`}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 rounded-lg font-bold shadow bg-neutral-200 hover:bg-neutral-300 text-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white transition-all duration-300 text-lg hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
              )}
            </div>
            {/* Account Management Section */}
            <div className="mt-8">
              <button
                className="text-primary font-semibold underline text-base mb-2"
                onClick={() => setShowAccount(v => !v)}
              >
                {showAccount ? 'Hide' : 'Show'} Account Management
              </button>
              {showAccount && (
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-4 flex flex-col gap-3 mt-2">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Change Email</label>
                    <input
                      type="email"
                      placeholder="New Email"
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Change Password</label>
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <button
                    className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition"
                    onClick={handleAccountUpdate}
                  >
                    Update Account
                  </button>
                  {accountMsg && <div className="text-green-700 dark:text-green-300 font-medium mt-1">{accountMsg}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;