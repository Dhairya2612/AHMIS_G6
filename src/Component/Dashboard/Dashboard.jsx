//Programmed By Anjali Kushwaha
//Date: 18/10/2023
//UserApproval Dashboard

import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './RegUserList.css';

import { Modal ,Button} from 'react-bootstrap';
import withSessionTimeoutCheck from '../withSessionTimeoutCheck'

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

 



  // useEffect(() => {
  //   fetchUserData()
  //     .then((response) => {
  //       setData(response.data);
  //       alert("fetch token " + response.data);
  //     })
  //     .catch((e) => {
  //       // localStorage.clear();
  //       // props.history.push('/');
  //     });
  // }, []);

  // const logOut = () => {
  //   localStorage.clear();
  //   props.history.push('/');
  // };

  // This is for fetching user list from the backend
  const [user, setUsers] = useState([]);
 // Status dropdown menu
 const currentStatusOptions = ['Approved', 'Rejected', 'Pending'];
 // State to manage the filtered users
 const [filteredUsers, setFilteredUsers] = useState([]);


  // This is used for searching logic
  const [searchCriteria, setSearchCriteria] = useState({
    userName: '',
    fullName: '',
    emailid: '',
    mobileNumber: '',
    userDesignation: '',
    otherRole: '',
    entryDate: '',
    statusCode: '',
    currentStatus: '',
  });

  //For fetching data from backend
  useEffect(() => {
    fetch('http://localhost:8082/fetchuser/all')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  
  // Function to handle input change for search criteria
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  // Function to filter users based on search criteria
  const filterUsers = () => {
    const filtered = user.filter((u) => {
      const jsonData = JSON.parse(u.gstr_json_data);
      return (

        u.gstr_user_name.toLowerCase().includes(searchCriteria.userName.toLowerCase()) &&
        (jsonData.full_name || '').toLowerCase().includes(searchCriteria.fullName.toLowerCase()) &&
        (jsonData.emailID || '').toLowerCase().includes(searchCriteria.emailid.toLowerCase()) &&
        (jsonData.mobile_no || '').includes(searchCriteria.mobileNumber) &&
        (jsonData.designation || '').toLowerCase().includes(searchCriteria.userDesignation.toLowerCase()) &&
        (jsonData.otherRoles || '').toLowerCase().includes(searchCriteria.otherRole.toLowerCase()) &&
        (jsonData.entry_date || '').toLowerCase().includes(searchCriteria.entryDate.toLowerCase()) &&
        (searchCriteria.currentStatus === '' ||
          (u.gstr_status === 2 && searchCriteria.currentStatus === 'Approved') ||
          (u.gstr_status === 0 && searchCriteria.currentStatus === 'Pending') ||
          (u.gstr_status === 1 && searchCriteria.currentStatus === 'Rejected'))
      );
    });
    setFilteredUsers(filtered);
  };
  
  // Update the filtered users when the search criteria or user data change
  useEffect(() => {
    filterUsers();
  }, [searchCriteria, user]);

  
  const [userData, setUserData] = useState([]);
  const [gstr_user_name, setGstrUserName] = useState('');


  const [approvalLoading, setApprovalLoading] = useState(false);

  const approveUser = (userName) => {
    setApprovalLoading(true);
    axios
      .post(`http://localhost:8082/fetchuser/updateStatus?gstr_user_name=${userName}`)
      .then((response) => {
        // Handle the success response if needed
        toast.success('User approved successfully');

        // Reload the window after 0.2 seconds (200 milliseconds)
        setTimeout(() => {
          window.location.reload();
        }, 200);
      })
      .catch((error) => {
        console.error('Error rejecting user:', error);
        toast.error('Error rejecting user');
      })
      .finally(() => {
        setApprovalLoading(false);
      });
  };






  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [userName, setUserName] = useState(''); // Set the initial value appropriately

  const handleUserReject = () => {
    setLoading(true);
    axios
      .post(`http://localhost:8082/fetchuser/rejectUser?gstr_user_name=${userName}&rejectionReason=${rejectionReason}`)
      .then((response) => {
        toast.success('User rejected successfully');
        handleRejectModalClose();
        window.location.reload();
      })
      .catch((error) => {
        toast.error('Error rejecting user');
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API request is complete
      });
  };


  const handleRejectModalOpen = (userName) => {
   
    setUserName(userName);
    setRejectionReason(''); // Clear the previous rejection reason
    setShowRejectModal(true);
   
  };
  

  const handleRejectModalClose = () => {
    setShowRejectModal(false);
    setUserName('');
    setRejectionReason('');
  };


   const handleTransferData = () => {
        axios.post('http://localhost:8080/api/transfer-data')
            .then(response => {
                console.log(response.data);
                // Handle success if needed
            })
            .catch(error => {
                console.error(error);
                // Handle error if needed
            });
    };


  
  
  return (
    <div className='main-main-container'>
    <div className='master-container'>
      <div className='newUser'>
        <div className='table-box' style={{ marginTop: '-22rem', height: '540px', overflowY: 'scroll',border:'1px solid black' }}>
          <table className='f1-table'>
            <thead className='sticky-header' style={{ position: 'sticky', top:'0', zIndex: 1 }}>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email Id</th>
                <th>Mobile Number</th>
                <th>Role Requested</th>
                <th>Other Roles</th>
                <th>Requested Date</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
              <tr>
                <th>
                  <input
                    type='text'
                    placeholder='Search by ID'
                    value={searchCriteria.userName}
                    onChange={(e) => setGstrUserName(e.target.value)}
                    style={{ width: '170px' , borderRadius:'4px',padding:'8px'}}
                  />
                </th>
                <th>
                  <input
                    type='text'
                    placeholder='Search by Name'
                    value={searchCriteria.fullName}
                    onChange={handleInputChange}
                    style={{ width: '170px' , borderRadius:'4px',padding:'8px'}}
                  />
                </th>
                <th>
                  <input
                    type='text'
                    placeholder='Search by Email'
                    value={searchCriteria.emailid}
                    onChange={handleInputChange}
                    style={{ width: '160px' , borderRadius:'4px',padding:'8px'}}
                  />
                </th>
                <th>
                  <input
                    type='text'
                    placeholder='Search by Mobile Number'
                    value={searchCriteria.mobileNumber}
                    onChange={handleInputChange}
                    style={{ width: '90px' , borderRadius:'4px',padding:'8px'}}
                  />
                </th>
                <th>
                  <input
                    type='text'
                    placeholder='Search by Role Requested'
                    value={searchCriteria.userDesignation}
                    onChange={handleInputChange}
                    style={{ width: '90px' , borderRadius:'4px',padding:'8px'}}
                  />
                </th>
                <th>
                  <input
                    type='text'
                    placeholder='Other Role'
                    value={searchCriteria.otherRole}
                    onChange={handleInputChange}
                    style={{ width: '90px' , borderRadius:'4px',padding:'8px'}}
                  />
                </th>
                <th>
                  <input
                    type='text'
                    placeholder='Search Date'
                    value={searchCriteria.entryDate}
                    onChange={handleInputChange}
                    style={{ width: '90px' , borderRadius:'4px',padding:'8px'}}
                  />
                </th>
                <th>
                  <select
                    value={searchCriteria.currentStatus}
                    onChange={handleInputChange}
                    style={{ width: '90px' , borderRadius:'4px',padding:'8px'}}
                  >
                    <option value=''>Filter by Status</option>
                    {currentStatusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const jsonData = JSON.parse(user.gstr_json_data);
                return (
                  <tr key={user.gstr_user_name}>
                    <td className="vertical-line" style={{ textAlign: 'left' }}>{user.gstr_user_name}</td>
                    <td className="vertical-line" style={{ textAlign: 'left' }}>{jsonData.full_name}</td>
                    <td className="vertical-line" style={{ textAlign: 'left' }}>{jsonData.emailID}</td>
                    <td className="vertical-line">{jsonData.mobile_no}</td>
                    <td className="vertical-line">{jsonData.designation}</td>
                    <td className="vertical-line">{jsonData.otherRoles}</td>
                    <td className="vertical-line">{jsonData.entry_date}</td>
                    <td className="vertical-line">
  {user.gstr_status == 1 && <p style={{backgroundColor:'green'}}> Approved</p> }
  {user.gstr_status == 0 && <p style={{backgroundColor:'orange'}}> Pending</p>}
  {user.gstr_status == 2 && <p style={{backgroundColor:'#FF3800'}}> Rejected</p>}
</td>     <td>


 <button
  className='approve-button'
  onClick={() => approveUser(user.gstr_user_name)}
  title='Approve User'
  disabled={approvalLoading || user.gstr_status == 1}
>
  <i className='fas fa-check'></i>
</button>





        <button className="button2" onClick={() => handleRejectModalOpen(user.gstr_user_name)} disabled={user.gstr_status == 2}>
        <i className="fas fa-times"></i> 

      </button>
                      <button className="button3" disabled  style={{opacity:'0.6'}} >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="button4" disabled  style={{opacity:'0.6'}} >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Modal show={showRejectModal} onHide={handleRejectModalClose} centered backdrop="static" keyboard={false} dialogClassName="reject-modal">
  <Modal.Header closeButton>
    <Modal.Title style={{ fontSize: '20px' }}>Reject User <i style={{color:'red'}} class="fa fa-exclamation-triangle" aria-hidden="true"></i></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p className='modaltext' style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
      Are you sure you want to reject this user?
    </p>
    <br />
    <p style={{ fontSize: '15px', padding: '4px' }}>Please provide a reason for rejection:</p>
    <p style={{ fontSize: '12px', padding: '2px' }}> Review user ID </p>
    <input
      type="text"
      readOnly // Make the input read-only
      style={{
        width: '48rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        height: '4rem',
        backgroundColor: 'whitesmoke',
        marginTop: '1rem',
        marginBottom: '1rem',
        borderRadius: '12px',
        padding: '10px', // Add padding for text
      }}
      value={userName}
    />

    <textarea
      value={rejectionReason}
      onChange={(e) => setRejectionReason(e.target.value)}
      placeholder="Rejection Reason"
      maxLength={100}
      style={{
        width: '48rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        height: '8rem',
        backgroundColor: 'whitesmoke',
        marginTop: '1rem',
        marginBottom: '1rem',
        borderRadius: '12px',
        padding: '10px', // Add padding for text
      }}
    />
  </Modal.Body>
  <Modal.Footer className='modelfooter' style={{ textAlign: 'center' }}>
    {loading ? (
      <p style={{ fontSize: '18px' }}>Loading... <i class="fas fa-spinner fa-spin"></i></p> 
    ) : (
      <>
        <Button className='reject' onClick={handleUserReject} disabled={ rejectionReason=='' }>
          Yes, Reject
        </Button>
        <Button className='close' onClick={handleRejectModalClose}>
          Close
        </Button>
      </>
    )}
  </Modal.Footer>
</Modal>



      <ToastContainer 
      
      position="top-center"
     

hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}



theme="light"
      
      autoClose={1000} />
    
    </div>
  );
};

export default  withSessionTimeoutCheck(Dashboard);