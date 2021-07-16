import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import {showErrorMsg} from '../../helpers/message';
import {showLoading} from '../../helpers/loading';
import {setAuthentication, isAuthenticated} from '../../helpers/auth'
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {login} from '../../../api/auth' 

export default function Login()  {
    let history = useHistory();

    // useEffect(() => {
    //   if(isAuthenticated() && isAuthenticated().role ===1){
    //     history.push('/admin/dashboard');
    //   }else if(isAuthenticated() && isAuthenticated().role ===0){
    //     history.push('/user/dashboard');
    //   }
    // },[history]);

    const [formData, setFormData] = useState({
        email:'',
        password:'',
        errorMsg:false,
        loading:false,
       
      });

      const {
        email, 
        password,  
        errorMsg,
        loading,
       
      } = formData

      const handleChange = evt => {
        // console.log(evt);
        setFormData({
          ...formData,
          [evt.target.name]:evt.target.value,
          errorMsg:'',
        })
      };  

      const handleSubmit = (evt) => {
          evt.preventDefault();

          if(
              isEmpty(email) || 
              isEmpty(password)
              ){
            setFormData({
              ...formData, errorMsg: "All fields are required"
            })
       
          }else if (!isEmail(email)){
            setFormData({
              ...formData, errorMsg: 'Invalid email',
            })
          }else {
         
          const{ email, password} = formData;
          const data = {email, password};
      
          setFormData({...formData, loading: true});
      
            login(data)
              .then(response => {
                  setAuthentication(response.data.token, response.data.user);

                  if(isAuthenticated() && isAuthenticated().role ===1){
                    console.log('Redirect to admin dashboard');
                    history.push('/admin/dashboard');
                  }else {
                    console.log('rederect to user dashboard');
                    history.push('/user/dashboard');
                  }
              })
              .catch(err => {
                console.log('login api function error', err);
              })
          }
      };

    return (
        <div className="login">
        <span className="loginTitle">Login</span>
        {loading && showLoading()}
        {errorMsg && showErrorMsg(errorMsg)}
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
          type="text"
          name="email"
          value={email}
          className="registerInput"
          placeholder="Enter your email..."
          onChange={handleChange}
        />
          <label>Password</label>
          <input
          type="password"
          name="password"
          value={password}
          className="registerInput"
          placeholder="Enter your password..."
          onChange={handleChange}
         
        />
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
      </div>
    )
}


