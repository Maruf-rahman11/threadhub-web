import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import useAxios from '../Pages/Hooks/useAxios';
import saveUserToDB from '../Pages/Hooks/saveUserToDB';

const Register = () => {
    const { loading,createUser,setUser, updateUser } = use(AuthContext)
    const[passError, setPassError] = useState('')
    const[nameError,setNameError ] =useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const axios = useAxios();
console.log(loading)
      const failed = () => toast.warning("Insert valid information",{
        autoClose: 2000
      });

    const handleRegister=(e)=>{
         e.preventDefault();
         const form = e.target
         const name = form.name.value
         const photo = form.photo.value
         const email = form.email.value
         const password = form.password.value
         if(name.length < 3){
          setNameError('Name should be more than 5 characters ')
          return;
           }

           const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    
            if (!passwordRegex.test(password)) {
              setPassError("Password must contain at least 6 characters, 1 uppercase letter, 1 lowercase letter,1 number, 1 special character");
               return;
      }
           createUser(email,password)
           .then(result=>{
            const userdata = result.user
            updateUser({ displayName : name,photoURL : photo, })
            const data = {
              ...userdata,
              displayName : name,
              photoURL : photo,
            }
            saveUserToDB(data,axios)
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Logged in Successful",
              showConfirmButton: false,
              timer: 1500
            });
            setUser({...userdata,displayName : name,photoURL : photo })
            navigate(`${location.state? location.state : "/"}`)
           })
           .catch(error=>{
            failed();
            console.log(error)
           })

    }
    return (
        <div>
          <Helmet>
                       <title>StudyNest | Register</title>
                   </Helmet>
              <div className='mx-auto'>
          {/* <ToastContainer></ToastContainer> */}
            <p className='text-3xl font-semibold mb-6 text-center' >Create your account</p>
            <div class="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleRegister} class="card-body">
        <fieldset class="fieldset">
          <label class="label">Username</label>
          <input name='name' type="text" class="input" required placeholder="Username" />
          {nameError && <p className='text-red-600'>{nameError}</p>}

          <label class="label">Photo URL</label>
          <input name='photo' type="text" class="input" required placeholder="Photo link" />
        
          <label class="label">Email</label>
          <input name='email' type="email" class="input" required placeholder="Email" />

          <label class="label">Password</label>
          <input name='password' type="password" class="input" required placeholder="Password" />
          {passError && <p className='text-red-600'>{passError}</p>}

          <button type='submit' class="btn btn-neutral mt-4">Sign Up</button>
          <p className='my-3 text-center' >Already have an account?<Link to={'/auth/login'}><span className='text-blue-600'>Log In</span></Link></p>
        </fieldset>
      </form>
    </div>
        </div>
        </div>
    );
};

export default Register;