import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    onLogin();
    const response = await axios.post('/api/login', data);

    const { token, role,email } = response.data;
    console.log(role);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('StudentId', email);
    if (data.email.startsWith("admin")) {
      navigate("/admin/dashboard");
    } else {
      navigate("/student/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-indigo-400">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Student ID
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your Student ID"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
              {...register("email", {
                required: "StudentID is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="space-y-2">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 text-gray-900"
              {...register("dob", { required: "Date of Birth is required" })}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs font-medium">
                {errors.dob.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;