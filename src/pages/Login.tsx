import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import NavBar from '@/components/ui/NavBar';
import { useAuth } from '@/context/authentication';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, state } = useAuth();
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Login successful!');
    }
  };

  return (
    <div className="min-h-screen bg-brown-100 flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[798px] bg-brown-200 rounded-[16px] px-[120px] py-[60px]">
          <h2 className="text-h2 font-medium text-center mb-8">Log in</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-body-lg text-brown-400">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-[48px] px-[16px]"
                showSearchIcon={false}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-body-lg text-brown-400">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="h-[48px] px-[16px]"
                showSearchIcon={false}
              />
            </div>

            {/* Error Message */}
            {state.error && (
              <div className="text-red-600 text-center text-body-md">
                {state.error}
              </div>
            )}

            {/* Login Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="px-[40px] py-[12px] !text-white !bg-brown-600"
                disabled={state.loading === true}
              >
                {state.loading ? 'Logging in...' : 'Log in'}
              </Button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className="text-body-md text-brown-400">Don't have any account? </span>
            <button
              onClick={() => navigate('/signup')}
              className="text-body-md text-brown-600 underline hover:no-underline ml-[6px]"
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
