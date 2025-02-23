import React from 'react';
import { useForm } from 'react-hook-form';
import './LoginPageStyle.css'; // For custom styles (explained below)
import { useNavigate } from 'react-router-dom';

const LoginPage = ({onLogin}) => {
  const navigate=useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    onLogin();
    console.log(data);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login-title">Login</h2>

        <div className="input-group">
          <input
            id="email"
            type="email"
            placeholder='Enter a Email'
            {...register("email", { required: "Email is required", pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="input-group">
          <input
            id="dob"
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
          />
          {errors.dob && <span className="error">{errors.dob.message}</span>}
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
