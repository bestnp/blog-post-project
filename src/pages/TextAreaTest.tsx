import React, { useState } from 'react';
import TextArea from '@/components/ui/TextArea';

const TextAreaTest: React.FC = () => {
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">TextArea Component Test</h1>
        
        {/* All 3 States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">All TextArea States</h2>
          <div className="space-y-8">
            {/* Default State */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">1. Default State</h3>
              <TextArea
                label="Text Area Label"
                placeholder="Placeholder Text"
                state="default"
              />
            </div>

            {/* Focus State */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">2. Focus State</h3>
              <TextArea
                label="Text Area Label"
                placeholder="Placeholder Text"
                state="focus"
              />
            </div>

            {/* Completed State */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">3. Completed State</h3>
              <TextArea
                label="Text Area Label"
                value="Placeholder Text"
                state="completed"
              />
            </div>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Interactive Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Controlled TextArea</h3>
              <TextArea
                label="Message"
                placeholder="Type your message here..."
                helpText="This textarea is controlled by React state"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-2">
                Current value: "{textareaValue}"
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">With Help Text</h3>
              <TextArea
                label="Description"
                placeholder="Enter a detailed description..."
                helpText="Please provide as much detail as possible"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Error State</h3>
              <TextArea
                label="Comments"
                placeholder="Enter your comments..."
                errorText="This field is required"
              />
            </div>
          </div>
        </section>

        {/* Different Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Different Sizes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Small TextArea</h3>
              <TextArea
                label="Short Note"
                placeholder="Brief note..."
                className="min-h-[60px]"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Large TextArea</h3>
              <TextArea
                label="Long Description"
                placeholder="Enter a detailed description here..."
                className="min-h-[200px]"
              />
            </div>
          </div>
        </section>

        {/* Form Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Form Example</h2>
          <form className="space-y-6 max-w-2xl">
            <TextArea
              label="Project Description"
              placeholder="Describe your project in detail..."
              helpText="Include goals, timeline, and any specific requirements"
              required
            />
            
            <TextArea
              label="Additional Notes"
              placeholder="Any additional information..."
              helpText="Optional: Add any other relevant details"
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

        {/* Custom Styling */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Custom Styling</h2>
          <div className="space-y-6">
            <TextArea
              label="Custom Styled TextArea"
              placeholder="This has custom styling..."
              helpText="Custom container and label styling applied"
              containerClassName="max-w-lg"
              labelClassName="text-blue-600 font-bold"
              helpTextClassName="text-blue-500"
            />
          </div>
        </section>

        {/* Resize Handle Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Resize Handle</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Resizable TextArea</h3>
              <TextArea
                label="Resizable TextArea"
                placeholder="You can resize this textarea by dragging the handle in the bottom-right corner..."
                helpText="Drag the resize handle to adjust the height"
                className="min-h-[120px]"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Fixed Size TextArea</h3>
              <TextArea
                label="Fixed Size TextArea"
                placeholder="This textarea has a fixed height and cannot be resized..."
                helpText="This textarea cannot be resized"
                className="h-32 resize-none"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TextAreaTest;
