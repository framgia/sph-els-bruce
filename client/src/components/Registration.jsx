import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";


function Registration() {

    const navigate = useNavigate();
    
    const [registerInput ,setRegister] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
      
    });

   const [error_list, setError_list]= useState([]);
    
    const handleInput = (e) =>{
        e.preventDefault();
   setRegister({...registerInput, [e.target.name]: e.target.value});

    }


    const registerSubmit = async (e)=> {
        e.preventDefault();

        const data =  {
            firstname: registerInput.firstname,
            lastname: registerInput.lastname,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        }

        await axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`api/register`,data).then(res =>{
                if(res.data.status === 200){
                        localStorage.setItem('auth_token',res.data.token);
                        localStorage.setItem('auth_name',res.data.username);
                        swal("Success",res.data.message,"success");
                        navigate("/dashboard");
                
                }
                else{
                
                    setError_list(res.data.validate_err);
                }

      })
            
        });
    }

  return (
    <div>
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Registration</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={registerSubmit}>

                                <div className="form-group mb-3">
                                    <label>First Name</label>
                                    <input type="text" name='firstname' onChange={handleInput} className='form-control' value={registerInput.firstname} />
                                    <span className='text-danger'>{error_list?.firstname}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Last Name</label>
                                    <input type="text" name='lastname' className='form-control' onChange={handleInput} value={registerInput.lastname} />
                                    <span className='text-danger'>{error_list?.lastname}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="text" name='email' className='form-control'  onChange={handleInput} value={registerInput.email} />
                                    <span className='text-danger'>{error_list?.email}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input type="password" name='password' className='form-control' onChange={handleInput} value={registerInput.password} />
                                    <span className='text-danger'>{error_list?.password}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Confirm Password</label>
                                    <input type="password" name='password_confirmation' className='form-control' onChange={handleInput} value={registerInput.password_confirmation} />
                                    <span className='text-danger'>{error_list?.password_confirmation}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <button className="btn btn-primary">Register</button>
                                </div>
                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Registration