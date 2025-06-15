import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useAuth } from '../context/AuthProvider.jsx'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch("password", " ")
  const confirmPassword = watch("confirmpassword", " ")

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match"
  }

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    await axios.post("/api/user/signup", userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("User Created Successfully")
          navigate("/login");
        }
      localStorage.setItem("messenger",JSON.stringify(response.data))
      setAuthUser(response.data);

  }).catch ((error) => {
    if (error.response) {
      alert("Error" + error.response.data.error)
    }
  })
}


return (
  <div className='flex h-screen items-center justify-center '>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='border border-black p-4 rounded-lg w-93 justify-center'>
      <h1 className='text-5xl font-bold font-[cursive]'>Messenger</h1>

      <h1 className='font-bold text-2xl items-center'>Create a new Account</h1>
      <h2>It's free and always be</h2>
      <div className='space-y-3'>
        <fieldset className="fieldset">
          <input type="text" className="input" placeholder="Your Name"
            {...register("name", { required: true })}
          />
        </fieldset>
        {errors.name && <span>This field is required</span>}


        <label className="input validator">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input type="email" placeholder="mail@site.com" required
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && <span className='text-red-500'>This field is required</span>}
        <div className="validator-hint hidden">Enter valid email address</div>

        {/* pswd */}
        <div>
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && <span>This field is required</span>}
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
          </p>

        </div>

        {/* confirm pswd*/}
        <div>
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Confirm Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              {...register("confirmPassword", { required: true, validate: validatePasswordMatch, })}
            />
          </label>
          {errors.confirmPassword && <span className='text-red-500 text-sm font-semibold'>
            {errors.confirmPassword.message}</span>}
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
          </p>
        </div>


        {/* Text and Button */}
        <div className='flex justify-center bg-blue-600 text-white w-full rounded-lg py-2
                  cursor-pointer'>
          <input type='submit' value="Signup"></input>
          {errors.exampleRequired && <span>This field is required</span>}
        </div>

        <p> Have any Account?{""}
          <Link to={"/login"} className='text-blue-600 cursor-pointer underline ml-1'>{""}
            Login
          </Link>
        </p>

      </div>
    </form>
  </div>
)
}

export default Signup
