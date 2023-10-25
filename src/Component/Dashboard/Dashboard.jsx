import React from 'react'
import { useState } from "react";
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import {fetchUserData} from '../api/authenticationService';




const Dashboard = (props) => {
    const dispatch=useDispatch();
const [loading,setLoading]=useState(false);
const [data,setData]=useState({});

React.useEffect(()=>{
    fetchUserData().then((response)=>{
        setData(response.data);
        alert("fatch token " +response.data)
    }).catch((e)=>{
        
       //  localStorage.clear();
        //props.history.push('/');
    })
},[])

    const [style, setStyle] = useState("navbar-nav bg-gradient-dark sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-dark sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-dark sidebar sidebar-dark accordion toggled");
        }
        else{
            setStyle("navbar-nav bg-gradient-dark sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-dark sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-dark sidebar sidebar-dark accordion toggled1");
        }
        else{
            setStyle("navbar-nav bg-gradient-dark sidebar sidebar-dark accordion")
        }
    };
    
    const logOut=()=>{
       
        localStorage.clear();
        props.history.push('/');
       
       

    }

    return (
        <div >
            <body id="page-top">

                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper" >

                    {/*  <!-- Sidebar --> */}
                    <ul className={style} id="accordionSidebar" >

                        {/*  <!-- Sidebar - Brand --> */}
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                            <div className="sidebar-brand-icon ">
                            <i class="fas fa-user-shield"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3">Welcome </div>
                            <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                        </div>
                        </a>

                        {/*   <!-- Divider --> */}
                        <hr className="sidebar-divider my-0" />

                        {/*  <!-- Nav Item - Dashboard --> */}
                        <li className="nav-item active">
                            <a className="nav-link" href="index.html">
                                
                                <span  style={{fontSize:'1rem'}}>Dashboard</span></a>
                        </li>

                        {/*  <!-- Divider --> */}
                        <hr className="sidebar-divider" />

                        {/*   <!-- Heading --> */}
                  

                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo" >
                              <i class="fas fa-users"></i>
                                <span  style={{fontSize:'14px'}}>User Management</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded"  style={{fontSize:'12px'}}>
                                <h6 className="collapse-header">User Management:</h6>
                                <a className="collapse-item" href="cards.html">Group Master</a>
                                    <a className="collapse-item" href="buttons.html">Seat Master</a>
                                    <a className="collapse-item" href="cards.html">User Master</a>
                                    <a className="collapse-item" href="cards.html">Reset User Password</a>
                                    <a className="collapse-item" href="cards.html">Reset Admin Password</a>
                                </div>
                            </div>
                        </li>

                        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                                aria-expanded="true" aria-controls="collapseUtilities">
                             <i class="fas fa-user-tag"></i>
                                <span  style={{fontSize:'14px'}}>Role Management</span>
                            </a>
                            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded" style={{fontSize:'12px'}}>
                                    <h6 className="collapse-header">Role Management:</h6>
                                    <a className="collapse-item" href="utilities-color.html">Role Master</a>
                                    <a className="collapse-item" href="utilities-border.html">Group Role Master</a>
                                    <a className="collapse-item" href="utilities-animation.html">Role Menu Master</a>
                                    <a className="collapse-item" href="utilities-other.html">Seat Role Master</a>
                                    <a className="collapse-item" href="utilities-other.html">Seat Permission Master</a>
                                </div>
                            </div>
                        </li>

                     

                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                        <li className="nav-item">
    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLogManagement"
        aria-expanded="false" aria-controls="collapseLogManagement">
        <i class="fas fa-clipboard-list"></i>
        <span  style={{fontSize:'14px'}}>Log Management</span>
    </a>
    <div id="collapseLogManagement" className="collapse" aria-labelledby="headingLogManagement"
        data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded" style={{fontSize:'12px'}}>
            <h6 className="collapse-header">Logs Management:</h6>
            <a className="collapse-item" href="login.html">User Profile</a>
            <a className="collapse-item" href="register.html">User Log Report</a>
            <a className="collapse-item" href="forgot-password.html">User Management Tree View</a>
            <a className="collapse-item" href="register.html">Seat Role Audit Log Report</a>
            <a className="collapse-item" href="register.html">Role Menu Audit Log Report</a>
            <a className="collapse-item" href="register.html">User Audit Log Report</a>
            <a className="collapse-item" href="register.html">Seat Permission Audit Report</a>
        </div>
    </div>
</li>

<li className="nav-item">
    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSettings"
        aria-expanded="false" aria-controls="collapseSettings">
        <i class="fas fa-cogs"></i>
        <span  style={{fontSize:'14px'}}>Settings</span>
    </a>
    <div id="collapseSettings" className="collapse" aria-labelledby="headingSettings"
        data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded" style={{fontSize:'12px'}}>
            <h6 className="collapse-header">Settings:</h6>
            <a className="collapse-item" href="login.html">Hospital Master</a>
        </div>
    </div>
</li>

<li className="nav-item">
    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseModuleManagement"
        aria-expanded="false" aria-controls="collapseModuleManagement">
        <i class="fas fa-swatchbook"></i>
        <span style={{fontSize:'14px'}}>Module Management</span>
    </a>
    <div id="collapseModuleManagement" className="collapse" aria-labelledby="headingModuleManagement"
        data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded" style={{fontSize:'12px'}}>
            <h6 className="collapse-header">Modules:</h6>
            <a className="collapse-item" href="login.html">Registration Config</a>
        </div>
    </div>
</li>
</ul>


 {/*  <!-- End of Sidebar --> */}

                    {/*  <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

{/*  <!-- Main Content --> */}
<div id="content">

    {/*  <!-- Topbar --> */}
    
     

       

            
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in">
                    
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                    </a>
                </div>
       

     

   
    {/*  <!-- End of Topbar --> */}

                  

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">

                                {/*  <!-- Page Heading --> */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                   
                                </div>

                        </div>
                        

                    </div>
                 
</div>
                </div>
                {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

                {/*  <!-- Logout Modal--> */}
                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <Button style={{marginTop:'5px'}} onClick={() =>logOut()}>Logout</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </body>
        </div>
    )
}  


export default Dashboard