// ExampleComponent.js

"use client"; // Add this line to indicate that this is a Client Component

import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './features/authSlice'; // Adjust path as needed

const ExampleComponent = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogin = (userData) => {
    dispatch(loginSuccess(userData));
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => handleLogin({ name: 'User', email: 'user@example.com' })}>
          Login
        </button>
      )}
    </div>
  );
};

export default ExampleComponent;
