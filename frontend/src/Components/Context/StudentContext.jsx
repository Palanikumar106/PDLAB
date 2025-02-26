import { createContext, useState, useContext } from "react";

// Create Context
const StudentContext = createContext();

// Provider Component
export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({
    Student_Id: "",
    Student_Name: "",
    Branch: "",
    Year: "",
    email: "",
    profile_pic: "",
    token: "",
  });

  const updateStudent = (data) => {
    setStudent((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const setToken = (token) => {
    setStudent((prev) => ({ ...prev, token }));
  };

  const logout = () => {
    setStudent({
      Student_Id: "",
      Student_Name: "",
      Branch: "",
      Year: "",
      email: "",
      profile_pic: "",
      token: "",
    });
  };

  return (
    <StudentContext.Provider
      value={{ student, updateStudent, setToken, logout }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
