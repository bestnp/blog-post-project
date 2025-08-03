import React from 'react';

const NavBar = () => {
  return (
    <nav style={{ display: 'flex', padding: '1rem', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
      <div style={{ fontWeight: 'bold' }}>hh.</div>
      <input type="text" placeholder="Search..." style={{ padding: '0.5rem', flex: '1', margin: '0 1rem' }} />
      <div>
        <button style={{ marginRight: '0.5rem' }}>Log in</button>
        <button style={{ background: '#000', color: '#fff' }}>Sign up</button>
      </div>
    </nav>
  );
};

export default NavBar;
