import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserService } from '../../services/userService';

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateUserProfile, uploadProfilePhoto } = useUserService();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentNumber: '',
    course: '',
    yearLevel: '',
    bio: '',
    photo: null,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        photo: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Update user profile
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        studentNumber: formData.studentNumber,
        course: formData.course,
        yearLevel: formData.yearLevel,
        bio: formData.bio,
      };

      const response = await updateUserProfile('me', userData);

      // Upload profile photo if selected
      if (formData.photo) {
        await uploadProfilePhoto('me', formData.photo);
      }

      // Navigate to dashboard after successful onboarding
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Student Number</label>
              <input
                type="text"
                name="studentNumber"
                value={formData.studentNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                required
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Academic Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year Level</label>
              <select
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                required
              >
                <option value="">Select Year Level</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Profile Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setStep(2)}
                className="w-1/2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Complete Setup
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's get to know you better
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="w-1/3 h-1 rounded-full bg-green-600" />
              <div className={`w-1/3 h-1 rounded-full ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
              <div className={`w-1/3 h-1 rounded-full ${step === 3 ? 'bg-green-600' : 'bg-gray-200'}`} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Basic Info</span>
              <span className="text-xs text-gray-500">Academic</span>
              <span className="text-xs text-gray-500">Profile</span>
            </div>
          </div>

          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Onboarding; 