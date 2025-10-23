import React, { useState } from 'react';
import { Alert, AlertGroup } from '@/components/ui/Alert';

const AlertTest: React.FC = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, variant: 'error' as const, title: 'Attention needed', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante vitae eros suscipit pulvinar.' },
    { id: 2, variant: 'success' as const, title: 'Success!', message: 'Your action was completed successfully. Everything is working as expected.' },
  ]);

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const addAlert = (variant: 'success' | 'error' | 'warning' | 'info' | 'default') => {
    const newAlert = {
      id: Date.now(),
      variant,
      title: variant === 'success' ? 'Success!' : 
             variant === 'error' ? 'Error occurred' :
             variant === 'warning' ? 'Warning!' :
             variant === 'info' ? 'Information' : 'Notice',
      message: 'This is a sample alert message. Click the X button to close this alert.'
    };
    setAlerts([...alerts, newAlert]);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">Alert Component Test</h1>
        
        {/* Basic Alert Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Basic Alert Examples</h2>
          <AlertGroup>
            <Alert
              variant="error"
              title="Attention needed"
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante vitae eros suscipit pulvinar."
              onClose={() => console.log('Error alert closed')}
            />
            <Alert
              variant="success"
              title="Success!"
              message="Your action was completed successfully. Everything is working as expected."
              onClose={() => console.log('Success alert closed')}
            />
          </AlertGroup>
        </section>

        {/* Interactive Alerts */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Interactive Alerts</h2>
          <div className="mb-4">
            <button
              onClick={() => addAlert('success')}
              className="bg-green text-white px-4 py-2 rounded mr-2 mb-2"
            >
              Add Success Alert
            </button>
            <button
              onClick={() => addAlert('error')}
              className="bg-red text-white px-4 py-2 rounded mr-2 mb-2"
            >
              Add Error Alert
            </button>
            <button
              onClick={() => addAlert('warning')}
              className="bg-orange text-white px-4 py-2 rounded mr-2 mb-2"
            >
              Add Warning Alert
            </button>
            <button
              onClick={() => addAlert('info')}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2"
            >
              Add Info Alert
            </button>
          </div>
          
          <AlertGroup>
            {alerts.map(alert => (
              <Alert
                key={alert.id}
                variant={alert.variant}
                title={alert.title}
                message={alert.message}
                onClose={() => removeAlert(alert.id)}
              />
            ))}
          </AlertGroup>
        </section>

        {/* All Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">All Alert Variants</h2>
          <AlertGroup>
            <Alert
              variant="default"
              title="Default Alert"
              message="This is a default alert with neutral styling."
              onClose={() => console.log('Default alert closed')}
            />
            <Alert
              variant="success"
              title="Success Alert"
              message="This indicates a successful operation or positive outcome."
              onClose={() => console.log('Success alert closed')}
            />
            <Alert
              variant="error"
              title="Error Alert"
              message="This indicates an error or something that needs immediate attention."
              onClose={() => console.log('Error alert closed')}
            />
            <Alert
              variant="warning"
              title="Warning Alert"
              message="This indicates a warning or something that requires caution."
              onClose={() => console.log('Warning alert closed')}
            />
            <Alert
              variant="info"
              title="Info Alert"
              message="This provides general information or tips to the user."
              onClose={() => console.log('Info alert closed')}
            />
          </AlertGroup>
        </section>

        {/* Custom Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Custom Content</h2>
          <AlertGroup>
            <Alert
              variant="success"
              title="Custom Alert"
              onClose={() => console.log('Custom alert closed')}
            >
              <p className="text-sm mb-2">This alert uses custom children content instead of the message prop.</p>
              <div className="flex gap-2">
                <button className="bg-white/20 text-white px-3 py-1 rounded text-xs">
                  Action 1
                </button>
                <button className="bg-white/20 text-white px-3 py-1 rounded text-xs">
                  Action 2
                </button>
              </div>
            </Alert>
          </AlertGroup>
        </section>

        {/* Without Close Button */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Alerts Without Close Button</h2>
          <AlertGroup>
            <Alert
              variant="info"
              title="Persistent Alert"
              message="This alert cannot be closed by the user. It will remain visible until the page is refreshed."
              showCloseButton={false}
            />
          </AlertGroup>
        </section>

        {/* Alert with Long Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-700">Alert with Long Content</h2>
          <AlertGroup>
            <Alert
              variant="warning"
              title="Important Notice"
              message="This is a longer alert message that demonstrates how the component handles extended content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              onClose={() => console.log('Long content alert closed')}
            />
          </AlertGroup>
        </section>
      </div>
    </div>
  );
};

export default AlertTest;
