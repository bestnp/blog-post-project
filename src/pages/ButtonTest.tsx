import React from 'react';
import { Button } from '@/components/ui/Button';

const ButtonTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">Button Component Test</h1>
        
        {/* Normal State */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Normal State</h2>
          <div className="flex gap-4 items-center">
            <Button variant="default">Default Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="text">Text Button</Button>
          </div>
        </section>

        {/* Hover State */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Hover State</h2>
          <div className="flex gap-4 items-center">
            <Button variant="default">Hover Me</Button>
            <Button variant="secondary">Hover Me</Button>
            <Button variant="text">Hover Me</Button>
          </div>
          <p className="text-sm text-brown-500 mt-2">Hover over the buttons to see the brown color hover effects</p>
        </section>

        {/* Active/Click State */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Active/Click State</h2>
          <div className="flex gap-4 items-center">
            <Button variant="default">Click Me</Button>
            <Button variant="secondary">Click Me</Button>
            <Button variant="text">Click Me</Button>
          </div>
          <p className="text-sm text-brown-500 mt-2">Click and hold the buttons to see the active effects</p>
        </section>

        {/* Disabled State */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Disabled State</h2>
          <div className="flex gap-4 items-center">
            <Button variant="default" disabled>Disabled Default</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
            <Button variant="text" disabled>Disabled Text</Button>
          </div>
        </section>

        {/* Different Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Different Sizes</h2>
          <div className="flex gap-4 items-center">
            <Button variant="default" size="sm">Small</Button>
            <Button variant="default" size="default">Default</Button>
            <Button variant="default" size="lg">Large</Button>
            <Button variant="default" size="icon">🔍</Button>
          </div>
          <p className="text-sm text-brown-500 mt-2">Includes new icon size variant</p>
        </section>

        {/* Focus State */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Focus State</h2>
          <div className="flex gap-4 items-center">
            <Button variant="default">Focus Me</Button>
            <Button variant="secondary">Focus Me</Button>
            <Button variant="text">Focus Me</Button>
          </div>
          <p className="text-sm text-brown-500 mt-2">Tab to focus on buttons to see the brown ring focus effect</p>
        </section>

        {/* All Variants in Different States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">All Variants Comparison</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Default Variant (Brown)</h3>
              <div className="flex gap-4 items-center">
                <Button variant="default">Normal</Button>
                <Button variant="default" disabled>Disabled</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Secondary Variant (Brown Border)</h3>
              <div className="flex gap-4 items-center">
                <Button variant="secondary">Normal</Button>
                <Button variant="secondary" disabled>Disabled</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 text-brown-600">Text Variant (Brown Underline)</h3>
              <div className="flex gap-4 items-center">
                <Button variant="text">Normal</Button>
                <Button variant="text" disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Button with Icons */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Buttons with Icons</h2>
          <div className="flex gap-4 items-center">
            <Button variant="default" size="icon">+</Button>
            <Button variant="secondary" size="icon">🔍</Button>
            <Button variant="text" size="icon">❤️</Button>
          </div>
          <p className="text-sm text-brown-500 mt-2">Icon-sized buttons for compact UI elements</p>
        </section>
      </div>
    </div>
  );
};

export default ButtonTest;

