// import React from 'react'
// import Login from '../../Components/Login/login'
// import SignUp from '../../Components/Signup/signUp'

// const Home = () => {
//   return (
//     <div className='w-full h-[100vh]'>
//         <div className='border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl'>
//             Welcome To Gym Management System 
//         </div>
//         <div className='w-full bg-cover flex justify-center h-[100%] bg-[url("https://images.stockcake.com/public/e/0/c/e0c07731-2523-4939-b4bc-71db137b7708_large/luxury-home-gym-stockcake.jpg")]'>
//              <Login />
//              <SignUp />
//         </div>
//     </div>
//   )
// }

// export default Home



import React, { useState } from 'react'
import Login from '../../Components/Login/login'
import SignUp from '../../Components/Signup/signUp'

const Home = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='min-h-screen w-full flex flex-col bg-slate-950 text-white'>

      {/* ── Header ───────────────────────────────────── */}
      <header className='flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/10 backdrop-blur-md bg-slate-900/60 sticky top-0 z-30'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-slate-900 text-lg shadow-lg shadow-emerald-500/30'>
            G
          </div>
          <span className='font-semibold text-lg tracking-wide'>
            Gym Management System
          </span>
        </div>
        <span className='hidden md:block text-sm text-slate-400'>
          Welcome 👋
        </span>
      </header>

      {/* ── Main ─────────────────────────────────────── */}
      <main className='flex-1 flex items-center justify-center px-4 py-10 relative overflow-hidden'>

        {/* Background image */}
        <div
          className='absolute inset-0 bg-cover bg-center scale-105'
          style={{
            backgroundImage: `url("https://images.stockcake.com/public/e/0/c/e0c07731-2523-4939-b4bc-71db137b7708_large/luxury-home-gym-stockcake.jpg")`,
          }}
        />

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-900/95' />

        {/* Card */}
        <div className='relative z-10 w-full max-w-md'>

          <div className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 p-6 md:p-8'>

            {/* Tabs */}
            <div className='flex mb-6 rounded-xl bg-slate-900/70 p-1 border border-white/10'>
              <button
                type='button'
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-900 shadow-lg shadow-emerald-500/30'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                type='button'
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-900 shadow-lg shadow-emerald-500/30'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Heading */}
            <div className='mb-6 text-center'>
              <h2 className='text-2xl font-bold text-white'>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className='text-sm text-slate-400 mt-1'>
                {isLogin
                  ? 'Sign in to continue to your dashboard'
                  : 'Join us and start your fitness journey'}
              </p>
            </div>

            {/* Form — only one rendered at a time */}
            <div className='text-slate-100'>
              {isLogin ? <Login /> : <SignUp />}
            </div>

          </div>

          <p className='mt-6 text-center text-xs text-slate-400'>
            © {new Date().getFullYear()} Gym Management System
          </p>
        </div>
      </main>
    </div>
  )
}

export default Home