import React, { useState } from 'react';
import Input from '@/components/ui/Input';

const InputTest: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">Input Component Test</h1>
        
        {/* All 5 States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">All Input States</h2>
          <div className="space-y-8">
            {/* Default State */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">1. Default State</h3>
              <Input
                label="Label"
                placeholder="Placeholder Text"
                helpText="Help text goes here"
                state="default"
              />
            </div>

            {/* Focus State */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">2. Focus State</h3>
              <Input
                label="Label"
                placeholder="Placeholder Text"
                helpText="Help text goes here"
                state="focus"
              />
            </div>

            {/* Error State */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">3. Error State</h3>
              <Input
                label="Label"
                placeholder="Placeholder Text"
                helpText="Help text goes here"
                errorText="Help text goes here"
                state="error"
              />
            </div>

            {/* Completed State */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">4. Completed State</h3>
              <Input
                label="Label"
                value="Placeholder Text"
                helpText="Help text goes here"
                state="completed"
              />
            </div>

            {/* Disabled State */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">5. Disabled State</h3>
              <Input
                label="Label"
                placeholder="Placeholder Text"
                helpText="Help text goes here"
                state="disabled"
              />
            </div>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Interactive Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Controlled Input</h3>
              <Input
                label="Search"
                placeholder="Type something..."
                helpText="This input is controlled by React state"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onClear={() => setInputValue('')}
              />
              <p className="text-sm text-gray-500 mt-2">
                Current value: "{inputValue}"
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Without Icons</h3>
              <Input
                label="Text Input"
                placeholder="No search icon or clear button"
                helpText="This input doesn't show search or clear icons"
                showSearchIcon={false}
                showClearButton={false}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Custom Styling</h3>
              <Input
                label="Custom Input"
                placeholder="Custom styled input"
                helpText="This input has custom container styling"
                containerClassName="max-w-md"
                labelClassName="text-blue-600 font-bold"
                helpTextClassName="text-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Different Input Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Different Input Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              helpText="We'll never share your email"
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              helpText="Must be at least 8 characters"
            />
            
            <Input
              label="Number"
              type="number"
              placeholder="Enter a number"
              helpText="Only numbers allowed"
            />
            
            <Input
              label="Search"
              type="search"
              placeholder="Search for something"
              helpText="Search across all content"
            />
          </div>
        </section>

        {/* Form Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Form Example</h2>
          <form className="space-y-6 max-w-md">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              helpText="This will be displayed on your profile"
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              helpText="We'll use this to contact you"
              required
            />
            
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              helpText="Include country code if international"
            />
            
            <div className="pt-4">
              <button
                type="submit"
                className="bg-brown-600 text-white px-6 py-2 rounded-md hover:bg-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-300"
              >
                Submit Form
              </button>
            </div>
          </form>
        </section>

        {/* Error Handling */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Error Handling</h2>
          <div className="space-y-6">
            <Input
              label="Username"
              placeholder="Choose a username"
              errorText="Username is already taken"
              state="error"
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              errorText="Password must contain at least 8 characters, one uppercase letter, and one number"
              state="error"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default InputTest;
