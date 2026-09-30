// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import {toast,ToastContainer} from 'react-toastify';


// const Login = () => {
//   const [loginField,setLoginField] = useState({"userName":"","password":""});
//   const navigate = useNavigate()

//  const handleLogin = async() => {
//     // sessionStorage.setItem("isLogin", true)
//     // navigate('/dashboard')

//     await axios.post('http://localhost:4000/auth/login', loginField, {withCredentials: true}).then((response) => {
//         console.log(response.data);
//         localStorage.setItem('gymName', response.data.gym.gymName);
//         localStorage.setItem('gymPic', response.data.gym.profilePic);
//         localStorage.setItem('isLogin', true);
//         localStorage.setItem('token', response.data.token);

//         navigate('/dashboard')

//     }).catch(err => {
//         const errorMessage = err.response.data.error
//         console.log(errorMessage)
//         toast.error(errorMessage)
//     })
// }

//      const handleOnChange =(event,name)=>{
//         setLoginField({...loginField,[name]:event.target.value});
//     }

//   return (
//     <div className='w-1/3 p-10 mt-20 ml-20 bg-gray-500 bg-opacity-50 h-fit'>
//       <div className='font-sans text-white text-center text-3xl'>Login</div>
      
//       <input value={loginField.userName} onChange={(event)=>{handleOnChange(event,"userName")}}  type='text' className='bg-white w-full my-10 p-2 rounded-lg' placeholder='Enter UserName' />
//       <input value={loginField.password} onChange={(event)=>{handleOnChange(event,"password")}} type='password' className='bg-white w-full mb-10 p-2 rounded-lg' placeholder='Enter Password' />


//       <div className='p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={()=>{handleLogin()}}>Login</div>
    
//     <ToastContainer />
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [loginField, setLoginField] = useState({ "userName": "", "password": "" });
  const navigate = useNavigate()

  const handleLogin = async () => {
    await axios.post('http://localhost:4000/auth/login', loginField, { withCredentials: true }).then((response) => {
      console.log(response.data);
      localStorage.setItem('gymName', response.data.gym.gymName);
      localStorage.setItem('gymPic', response.data.gym.profilePic);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard')

    }).catch(err => {
      const errorMessage = err.response.data.error
      console.log(errorMessage)
      toast.error(errorMessage)
    })
  }

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  }

  return (
    <div className='flex flex-col gap-4'>

      <input
        value={loginField.userName}
        onChange={(event) => { handleOnChange(event, "userName") }}
        type='text'
        placeholder='Enter UserName'
        className='w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400 transition'
      />

      <input
        value={loginField.password}
        onChange={(event) => { handleOnChange(event, "password") }}
        type='password'
        placeholder='Enter Password'
        className='w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400 transition'
      />

      <div
        onClick={() => { handleLogin() }}
        className='w-full mt-2 py-3 rounded-lg font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 shadow-lg shadow-emerald-500/30 transition-all duration-300 text-center cursor-pointer'
      >
        Login
      </div>

      <ToastContainer />
    </div>
  )
}

export default Login