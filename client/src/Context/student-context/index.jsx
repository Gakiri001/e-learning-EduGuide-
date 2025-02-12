import { createContext, useState } from "react";

export const studentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentViewCoursesList, setStudentViewCoursesList] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  return (
    <studentContext.Provider
      value={{
        studentViewCoursesList,
        setStudentViewCoursesList,
        loadingState,
        setLoadingState,
      }}
    >
      {children}
    </studentContext.Provider>
  );
}
