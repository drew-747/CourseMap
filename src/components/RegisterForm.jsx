import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, X } from 'lucide-react';

const RegisterForm = ({ onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    year: '1',
    standing: 'Regular',
    photo: null,
    photoPreview: null
  });

  const [errors, setErrors] = useState({});

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, photo: 'Photo must be less than 5MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.photo) newErrors.photo = 'Photo is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {formData.photoPreview ? (
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={formData.photoPreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                  <Camera className="text-gray-400" size={32} />
                </div>
              )}
              <label
                htmlFor="photo"
                className="absolute bottom-0 right-0 bg-[#4D9FFF] text-white p-2 rounded-full cursor-pointer hover:bg-[#3D8FEF]"
              >
                <Upload size={16} />
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo}</p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#4D9FFF]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#4D9FFF]"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#4D9FFF]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#4D9FFF]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#4D9FFF]"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Year and Standing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year Level
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#4D9FFF]"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Standing
              </label>
              <select
                value={formData.standing}
                onChange={(e) => setFormData(prev => ({ ...prev, standing: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#4D9FFF]"
              >
                <option value="Regular">Regular</option>
                <option value="Irregular">Irregular</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4D9FFF] text-white py-3 rounded-xl font-medium hover:bg-[#3D8FEF] transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default RegisterForm; 