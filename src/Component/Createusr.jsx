import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    gstr_user_name: '',
    gnum_hospital_code: '',
    gstr_json_data: {
        full_name:'',
      mobile_no: '',
      emailID: '',
      designation: '',
      user_type:'',
      user_group:'',
      user_seat:'',
      entry_date:  new Date().toLocaleDateString(),
      gender_name: '',
    },
    gnum_userId: '',
    gstr_status: "0",
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleJsonDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      gstr_json_data: {
        ...formData.gstr_json_data,
        [name]: value
      }
    });
  };

  


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Convert gstr_json_data to a JSON string
  formData.gstr_json_data = JSON.stringify(formData.gstr_json_data);

  try {
    const response = await axios.post('http://localhost:8080/home/saveusers', formData);
    console.log('Data saved successfully:', response.data);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

const handleRefreshClick = () => {
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <div  style={{marginTop:'20rem',marginLeft:'15rem'}}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="gstr_user_name"
          placeholder="User Name"
          value={formData.gstr_user_name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="gnum_hospital_code"
          placeholder="Hospital Code"
          value={formData.gnum_hospital_code}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobile_no"
          placeholder="Mobile No"
          value={formData.gstr_json_data.mobile_no}
          onChange={handleJsonDataChange}
        />
        <input
          type="text"
          name="emailID"
          placeholder="Email"
          value={formData.gstr_json_data.emailID}
          onChange={handleJsonDataChange}
        />

<input
          type="text"
          name="designation"
          placeholder="Enter Designation"
          value={formData.gstr_json_data.designation}
          onChange={handleJsonDataChange}
        />
 <input
          type="text"
          name="user_type"
          placeholder="Enter User Type"
          value={formData.gstr_json_data.user_type}
          onChange={handleJsonDataChange}
        />
 <input
          type="text"
          name="user_group"
          placeholder="Enter User Group"
          value={formData.gstr_json_data.user_group}
          onChange={handleJsonDataChange}
        />
 <input
          type="text"
          name="user_seat"
          placeholder="Enter User Seat"
          value={formData.gstr_json_data.user_seat}
          onChange={handleJsonDataChange}
        />


        <input
          type="text"
          name="entry_date"
          placeholder="Entry Date"
          value={formData.gstr_json_data.entry_date}
          onChange={handleJsonDataChange}
        />
        <input
          type="text"
          name="gender_name"
          placeholder="Gender Name"
          value={formData.gstr_json_data.gender_name}
          onChange={handleJsonDataChange}
        />
        <input
          type="number"
          name="gnum_userId"
          placeholder="User ID"
          value={formData.gnum_userId}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleRefreshClick}>Save Data</button>
      </form>
    </div>
  );
};

export default CreateUser;
