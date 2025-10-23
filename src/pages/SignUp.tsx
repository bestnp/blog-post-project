import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import NavBar from '@/components/ui/NavBar';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up data:', formData);
  };

  return (
    <div className="min-h-screen bg-brown-100 flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[480px] bg-brown-200 rounded-[16px] px-8 py-10">
          <h2 className="text-h2 font-bold text-center mb-8">Sign up</h2>

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-body-md text-brown-600 mb-2">
                Name
              </label>
              <Input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleInputChange}
                showSearchIcon={false}
                showClearButton={false}
                className="bg-white border-brown-300 rounded-[8px] h-[48px]"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-body-md text-brown-600 mb-2">
                Username
              </label>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                showSearchIcon={false}
                showClearButton={false}
                className="bg-white border-brown-300 rounded-[8px] h-[48px]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-body-md text-brown-600 mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                showSearchIcon={false}
                showClearButton={false}
                className="bg-white border-brown-300 rounded-[8px] h-[48px]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-body-md text-brown-600 mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                showSearchIcon={false}
                showClearButton={false}
                className="bg-white border-brown-300 rounded-[8px] h-[48px]"
              />
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full !text-white"
            >
              Sign up
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-body-md text-brown-600">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-body-md text-brown-600 underline hover:no-underline"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

