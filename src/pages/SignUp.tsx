import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import NavBar from '@/components/ui/NavBar';
import { Alert } from '@/components/ui/Alert';
import { DoneRoundLight } from '@/icon/IconsAll';
import { useAuth } from '@/context/authentication';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { register, state } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    variant: "success" | "error";
  }>({
    title: "",
    message: "",
    variant: "error",
  });

  // Clear any previous errors when component mounts
  useEffect(() => {
    // Clear error state by resetting it (we'll handle errors locally)
    if (state.error) {
      // Error will be cleared when user starts typing or submitting
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password length
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate required fields
    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      setAlertConfig({
        title: "Validation error",
        message: "Please fill in all fields",
        variant: "error",
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setErrors(prev => ({
        ...prev,
        email: 'Email must be a valid email'
      }));
      return;
    }

    // Validate password length
    if (!validatePassword(formData.password)) {
      setErrors(prev => ({
        ...prev,
        password: 'Password must be at least 6 characters'
      }));
      return;
    }

    const result = await register({
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      // Check if error is about email already taken
      const errorMessage = result.error.toLowerCase();
      if (errorMessage.includes('email') && (errorMessage.includes('taken') || errorMessage.includes('already') || errorMessage.includes('exists'))) {
        setErrors(prev => ({
          ...prev,
          email: 'Email is already taken, Please try another email.'
        }));
      } else {
        setAlertConfig({
          title: "Registration error",
          message: result.error,
          variant: "error",
        });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    } else {
      // Show success modal
      setShowSuccessModal(true);
    }
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-brown-100 flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[798px] bg-brown-200 rounded-[16px] px-[120px] py-[60px]">
          <h2 className="text-h2 font-medium text-center mb-8">Sign up</h2>

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-body-lg text-brown-400 mb-2">
                Name
              </label>
              <Input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleInputChange}
                onClear={() => setFormData(prev => ({ ...prev, fullName: '' }))}
                showSearchIcon={false}
                showClearButton={true}
                className="bg-white border-brown-300 rounded-[8px] h-[48px] px-[16px]"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-body-lg text-brown-400 mb-2">
                Username
              </label>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                onClear={() => setFormData(prev => ({ ...prev, username: '' }))}
                showSearchIcon={false}
                showClearButton={true}
                className="bg-white border-brown-300 rounded-[8px] h-[48px] px-[16px]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-body-lg text-brown-400 mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                onClear={() => {
                  setFormData(prev => ({ ...prev, email: '' }));
                  setErrors(prev => ({ ...prev, email: undefined }));
                }}
                state={errors.email ? "error" : "default"}
                errorText={errors.email}
                showSearchIcon={false}
                showClearButton={true}
                className="bg-white border-brown-300 rounded-[8px] h-[48px] px-[16px]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-body-md text-brown-400 mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                onClear={() => {
                  setFormData(prev => ({ ...prev, password: '' }));
                  setErrors(prev => ({ ...prev, password: undefined }));
                }}
                state={errors.password ? "error" : "default"}
                errorText={errors.password}
                showSearchIcon={false}
                showClearButton={true}
                className="bg-white border-brown-300 rounded-[8px] h-[48px] px-[16px]"
              />
            </div>

            {/* Sign Up Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="px-[40px] py-[12px] !text-white !bg-brown-600"
                disabled={state.loading === true}
              >
                {state.loading ? 'Signing up...' : 'Sign up'}
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-body-md text-brown-400">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-body-md text-brown-600 underline hover:no-underline ml-[6px]"
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      {/* Registration Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-brown-200 rounded-[12px] shadow-xl w-full max-w-[440px] p-8 relative">
            <div className="flex flex-col items-center">
              {/* Success Icon */}
              <div className="w-20 h-20 rounded-full bg-green flex items-center justify-center mb-6">
                <DoneRoundLight className="w-12 h-12 text-white stroke-[3]" />
              </div>

              {/* Success Title */}
              <h3 className="text-h3 font-bold text-brown-600 mb-8 text-center">
                Registration success
              </h3>

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                variant="default"
                size="default"
                className="!bg-brown-600 hover:!bg-brown-500 !text-white px-8"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] animate-in slide-in-from-right">
          <Alert
            variant={alertConfig.variant}
            title={alertConfig.title}
            message={alertConfig.message}
            showCloseButton={true}
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SignUp;

