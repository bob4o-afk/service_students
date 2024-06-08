import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Login from './Login';

const App = () => {
  const { keycloak } = useKeycloak();

  return (
    <div className="App">
      {keycloak.authenticated ? (
        <div>
          <h1>Student Management System</h1>
          <p>Welcome, {keycloak.tokenParsed.preferred_username}!</p>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
