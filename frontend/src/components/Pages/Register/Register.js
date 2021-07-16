import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {isAuthenticated} from '../../helpers/auth'
import equals from 'validator/lib/equals';
import {showErrorMsg,showSuccessMsg} from '../../helpers/message';
import {showLoading} from '../../helpers/loading';

import { register } from '../../../api/auth';

export default function Register() {
let history = useHistory();

  // useEffect(() => {
  //   if(isAuthenticated() && isAuthenticated().role ===1){
  //     history.push('/admin/dashboard');
  //   }else if(isAuthenticated() && isAuthenticated().role ===0){
  //     history.push('/user/dashboard');
  //   }
  // },[history]);

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
    password2:'',
    successMsg: false,
    errorMsg:false,
    loading:false
  })
   
  const {
    username, 
    email, 
    password, 
    password2, 
    successMsg, 
    errorMsg,
    loading
  } = formData

  const handleChange = evt => {
    // console.log(evt);
    setFormData({
      ...formData,
      [evt.target.name]:evt.target.value,
      successMsg:'',
      errorMsg:'',
    })
  };  

  const handleSubmit = evt =>{
    evt.preventDefault();

    //client side validation
   if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
      setFormData({
        ...formData, errorMsg: "All fields are required"
      })
 
    }else if (!isEmail(email)){
      setFormData({
        ...formData, errorMsg: 'Invalid email',
      })
    }else if (!equals(password, password2)){
      setFormData({
        ...formData, errorMsg: 'Passwords do not match',
      })
    }else {
   
    const{username, email, password} = formData;
    const data = {username, email, password};

    setFormData({...formData, loading: true});

      register(data)
      .then(response => {
        console.log('Axios sucess:', response);
        setFormData({
          username:'',
          email:'',
          password:'',
          password2:'',
          loading:false,
          successMsg: response.data.SuccessMessage
        })
      })
      .catch (err => {
        console.log("Axios Register error:",err);
        setFormData({...formData, loading: false, errorMsg: err.response.data. errorMessage});
      })
    }
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      {errorMsg && showErrorMsg(errorMsg)}
      {successMsg && showSuccessMsg(successMsg)}
      {loading && showLoading()}
      <form className="registerForm" onSubmit={handleSubmit} noValidate>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          className="registerInput"
          placeholder="Enter your username..."
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          className="registerInput"
          placeholder="Enter your email..."
          onChange={handleChange}
        />
        <label>Create Password</label>
        <input
          type="password"
          name="password"
          value={password}
          className="registerInput"
          placeholder="Enter your password..."
          onChange={handleChange}
         
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="password2"
          value={password2}
          className="registerInput"
          placeholder="Confirm your password..."
          onChange={handleChange}
         
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
  
      {/* <p style={{color:'black'}}>{JSON.stringify(formData)}</p> */}
     
    </div>
  );
}
