import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setSuccess('Profile updated successfully');
        setFormData(prev => ({ ...prev, password: '' }));
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred while updating your profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your Profile
          </h2>
          <p className={`mt-2 text-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Update your account information
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark 
                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500' 
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                } rounded-t-md focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark 
                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500' 
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                } focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark 
                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500' 
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                } rounded-b-md focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="New password (leave blank to keep current)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 