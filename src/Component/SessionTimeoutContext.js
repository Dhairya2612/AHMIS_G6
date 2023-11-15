import React, { createContext, useContext, useState, useEffect } from 'react';

const SessionTimeoutContext = createContext();

export function useSessionTimeout() {
  return useContext(SessionTimeoutContext);
}

export function SessionTimeoutProvider({ children }) {
  const [lastActivity, setLastActivity] = useState(new Date().getTime());

  const updateLastActivity = () => {
    setLastActivity(new Date().getTime());
  };

  useEffect(() => {
    const idleTime = 15 * 60 * 1000; // 15 minutes in milliseconds
    const checkActivity = () => {
      const now = new Date().getTime();
      if (now - lastActivity > idleTime) {
        // Session timeout logic
        if (window.location.pathname !== '/') {
          alert("Session timed out");
          sessionStorage.clear(); // Clear session storage
          window.location.href = '/'; // Redirect to the login page
        }
      }
    };

    const activityInterval = setInterval(checkActivity, 1000); // Check every second

    const userActivityListener = () => {
      updateLastActivity(); // Update the last activity timestamp when the user interacts with the application
    };

    // Add an event listener to detect user activity (e.g., mousemove, keypress)
    window.addEventListener('mousemove', userActivityListener);
    window.addEventListener('keypress', userActivityListener);

    return () => {
      clearInterval(activityInterval);
      // Remove the event listeners when the component unmounts
      window.removeEventListener('mousemove', userActivityListener);
      window.removeEventListener('keypress', userActivityListener);
    };
  }, [lastActivity]);

  return (
    <SessionTimeoutContext.Provider value={{ updateLastActivity }}>
      {children}
    </SessionTimeoutContext.Provider>
  );
}
