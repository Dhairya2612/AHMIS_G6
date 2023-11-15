import React, { useEffect } from 'react';
import { useSessionTimeout } from './SessionTimeoutContext';

function withSessionTimeoutCheck(Component) {
  return function SessionTimeoutCheck(props) {
    const { updateLastActivity } = useSessionTimeout();

    useEffect(() => {
      const activityInterval = setInterval(updateLastActivity, 60000); // Check every minute

      return () => {
        clearInterval(activityInterval);
      };
    }, [updateLastActivity]);

    return <Component {...props} />;
  };
}

export default withSessionTimeoutCheck;
