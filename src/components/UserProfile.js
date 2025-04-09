import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import { storage, db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

function UserProfile({ onComplete }) {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    photoUrl: '',
    major: '',
    graduationYear: ''
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load existing profile data if available
    const loadProfile = async () => {
      try {
        const doc = await db.collection('users').doc(currentUser.uid).get();
        if (doc.exists) {
          setProfileData(doc.data());
          if (doc.data().photoUrl) {
            setPhotoPreview(doc.data().photoUrl);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile data');
      }
    };

    loadProfile();
  }, [currentUser]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async () => {
    if (!photoFile) return profileData.photoUrl;
    
    const fileRef = storage.ref().child(`profile-photos/${currentUser.uid}`);
    await fileRef.put(photoFile);
    return await fileRef.getDownloadURL();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    
    try {
      const photoUrl = photoFile ? await uploadPhoto() : profileData.photoUrl;
      
      await db.collection('users').doc(currentUser.uid).set({
        ...profileData,
        photoUrl,
        updatedAt: new Date()
      });

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      setError('Failed to save profile. Please try again.');
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Complete Your Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={photoPreview}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Button
          variant="outlined"
          component="label"
          disabled={saving}
        >
          Upload Photo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Display Name"
        name="displayName"
        value={profileData.displayName}
        onChange={handleChange}
        margin="normal"
        required
        disabled={saving}
      />

      <TextField
        fullWidth
        label="Bio"
        name="bio"
        value={profileData.bio}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={3}
        disabled={saving}
      />

      <TextField
        fullWidth
        label="Major"
        name="major"
        value={profileData.major}
        onChange={handleChange}
        margin="normal"
        required
        disabled={saving}
      />

      <TextField
        fullWidth
        label="Graduation Year"
        name="graduationYear"
        value={profileData.graduationYear}
        onChange={handleChange}
        margin="normal"
        required
        disabled={saving}
        type="number"
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving || !profileData.displayName || !profileData.major || !profileData.graduationYear}
        >
          {saving ? <CircularProgress size={24} /> : 'Save Profile'}
        </Button>
      </Box>
    </Box>
  );
}

export default UserProfile; 