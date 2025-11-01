import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import NavBar from '@/components/ui/NavBar';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '@/context/authentication';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, state } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset error state when user starts typing
    if (hasError) {
      setHasError(false);
      setShowErrorAlert(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);
    setShowErrorAlert(false);
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      // If login returns an error object, show error
      if (result && 'error' in result) {
        setHasError(true);
        setShowErrorAlert(true);
        // Show actual error message in toast
        toast.error(result.error || 'Login failed');
        // Auto hide after 5 seconds
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 5000);
      } else {
        // Login successful - navigation is handled in login function
        toast.success('Login successful!');
      }
    } catch (error: any) {
      console.error('Login error in component:', error);
      setHasError(true);
      setShowErrorAlert(true);
      toast.error(error.message || 'An unexpected error occurred');
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
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
                onClear={() => {
                  setFormData(prev => ({ ...prev, email: '' }));
                  setHasError(false);
                }}
                state={hasError ? "error" : "default"}
                className="h-[48px] px-[16px]"
                showSearchIcon={false}
                showClearButton={true}
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
                onClear={() => {
                  setFormData(prev => ({ ...prev, password: '' }));
                  setHasError(false);
                }}
                state={hasError ? "error" : "default"}
                className="h-[48px] px-[16px]"
                showSearchIcon={false}
                showClearButton={true}
              />
            </div>

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

      {/* Error Alert - Fixed at bottom right */}
      {showErrorAlert && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] animate-in slide-in-from-right">
          <Alert
            variant="error"
            message={
              <div>
                <p className="text-body-lg font-bold mb-1">
                  Your password is incorrect or this email doesn't exist
                </p>
                <p className="text-body-md">
                  Please try another password or email
                </p>
              </div>
            }
            showCloseButton={true}
            onClose={() => setShowErrorAlert(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
