import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import saveUserToDB from '../Pages/Hooks/saveUserToDB';
import useAxios from '../Pages/Hooks/useAxios';

const Login = () => {
    const{signInUser, GoogleSignIn,GithubSignIn} = use(AuthContext)
    const axios = useAxios();
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location)
    const from = location.state?.from?.pathname || "/";

      const failed = () => toast.warning("Insert valid information",{
        autoClose: 2000
      });
    const handleGoogleSignIn = () =>{
        GoogleSignIn()
        .then(result=>{
          saveUserToDB(result.user,axios)
Swal.fire({
  position: "center",
  icon: "success",
  title: "Logged in Successful",
  showConfirmButton: false,
  timer: 1500
});
navigate(from, { replace: true });
            console.log(result)
            console.log(location)
            
        })
        .catch(error=>{
            console.log(error)
            failed();
        })

    }
 
    const handleLogin=(e)=>{
        e.preventDefault()
        const form = e.target 
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email,password)
        .then(result=>{
          saveUserToDB(result.user,axios)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged in Successful",
                showConfirmButton: false,
                timer: 1500
              });
              navigate(from, { replace: true });
            console.log(result ,location.state)
            
        })
        .catch((error) => {
            failed();
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
          });


    }
    return (
        <div>
             <Helmet>
                       <title>ThreadHub | Login</title>
                   </Helmet>
              <div className='mx-auto'>
          {/* <ToastContainer></ToastContainer> */}
          
            <p className='text-3xl font-semibold mb-6 text-center' >Login your account</p>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input name='email' type="email" className="input" required placeholder="Email" />
          <label className="label">Password</label>
          <input name='password' type="password" className="input" required placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          {/* {error && <p className='text-red-600'>{error}</p>} */}
          <button type='submit' className="btn btn-neutral mt-4">Login</button>
          <p className='my-6 text-center' >Don't have an account?<Link to={'/auth/register'}><span className='text-blue-600'>Sign up</span></Link></p>
        </fieldset>
      </form>
      <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
    </div>
        </div>
        </div>
    );
};

export default Login;