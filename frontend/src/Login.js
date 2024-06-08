import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Login = () => {
  const { keycloak, initialized } = useKeycloak();

  return (
    <div>
      <h1>Welcome to the Student Management System</h1>
      {!keycloak.authenticated && (
        <button onClick={() => keycloak.login()}>Login</button>
      )}
      {!!keycloak.authenticated && (
        <button onClick={() => keycloak.logout()}>Logout ({keycloak.tokenParsed.preferred_username})</button>
      )}
    </div>
  );
};

export default Login;
