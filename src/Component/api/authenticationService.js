import React from 'react';
import axios from 'axios';


const getToken=()=>{
    alert("Token for this session is "+localStorage.getItem('USER_KEY'))
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/auth/login`,
        'data':authRequest
    })
}


export const fetchUserData=(authRequest)=>{
    
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/home/user`,
        headers:{
            
            'Authorization':'Bearer '+ getToken()
        }
    })
}