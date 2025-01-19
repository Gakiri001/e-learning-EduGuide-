import { createContext, useState } from "react";

export const studentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentViewCoursesList, setStudentViewCoursesList] = useState([]);

  return (
    <studentContext.Provider
      value={{ studentViewCoursesList, setStudentViewCoursesList }}
    >
      {children}
    </studentContext.Provider>
  );
}
