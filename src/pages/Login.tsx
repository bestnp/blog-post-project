import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import NavBar from '@/components/ui/NavBar';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
  };

  return (
    <div className="min-h-screen bg-brown-100 flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[480px] bg-brown-200 rounded-[16px] px-8 py-10">
          <h2 className="text-h2 font-bold text-center mb-8">Log in</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-body-md font-medium text-brown-600">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-[48px]"
                showSearchIcon={false}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-body-md font-medium text-brown-600">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="h-[48px]"
                showSearchIcon={false}
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full !text-white"
            >
              Log in
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className="text-body-md text-brown-600">Don't have any account? </span>
            <button
              onClick={() => navigate('/signup')}
              className="text-body-md text-brown-600 underline hover:no-underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
