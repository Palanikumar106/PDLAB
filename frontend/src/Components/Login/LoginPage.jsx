// // import React from "react";
// // import { useForm } from "react-hook-form";
// // import { useNavigate } from "react-router-dom";

// // const LoginPage = ({ onLogin }) => {
// //   const navigate = useNavigate();
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm();

// //   const onSubmit = (data) => {
// //     onLogin();

// //     console.log(data);
// //     if (data.email.startsWith("admin")) {
// //       navigate("/admin");
// //     } else {
// //       navigate("/student/profile");
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
// //         <h2 className="login-title">Login</h2>

// //         <div className="input-group">
// //           <input
// //             id="email"
// //             type="email"
// //             placeholder="Enter your email"
// //             {...register("email", {
// //               required: "Email is required",
// //               pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
// //             })}
// //           />
// //           {errors.email && (
// //             <span className="error">{errors.email.message}</span>
// //           )}
// //         </div>

// //         <div className="input-group">
// //           <input
// //             id="dob"
// //             type="date"
// //             {...register("dob", { required: "Date of Birth is required" })}
// //           />
// //           {errors.dob && <span className="error">{errors.dob.message}</span>}
// //         </div>

// //         <button type="submit" className="login-btn">
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default LoginPage;

// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ onLogin }) => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     onLogin();
//     console.log(data);
//     if (data.email.startsWith("admin")) {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/student/profile");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
//           Login
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-gray-600">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
//                   message: "Invalid email address",
//                 },
//               })}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="dob" className="block text-gray-600">
//               Date of Birth
//             </label>
//             <input
//               id="dob"
//               type="date"
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               {...register("dob", { required: "Date of Birth is required" })}
//             />
//             {errors.dob && (
//               <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onLogin();
    console.log(data);
    if (data.email.startsWith("admin")) {
      navigate("/admin/dashboard");
    } else {
      navigate("/student/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 text-gray-900"
              {...register("dob", { required: "Date of Birth is required" })}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs font-medium">
                {errors.dob.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;