import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserRejectForm = ({ userName, handleRejectModalClose }) => {
  const [rejectionReason, setRejectionReason] = useState('');

  const handleUserReject = () => {
    axios
      .put(`http://localhost:8082/fetchuser/all/reject/${userName}`, { reason: rejectionReason })
      .then((response) => {
        toast.success('User rejected successfully');
        handleRejectModalClose();
      })
      .catch((error) => {
        toast.error('Error rejecting user');
      });
  };

  return (
    <form>
      <label>
        Rejection Reason:
        <input
          type="text"
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleUserReject}>
        Reject User
      </button>
    </form>
  );
};

export default UserRejectForm;
