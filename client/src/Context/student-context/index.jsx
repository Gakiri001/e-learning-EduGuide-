import { createContext, useState } from "react";

export const studentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentViewCoursesList, setStudentViewCoursesList] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [studentViewCoursesDetails, setStudentViewCoursesDetails] =
    useState(null);
  const [currentCourseDetailsID, setCurrentCourseDetailsID] = useState(null);

  return (
    <studentContext.Provider
      value={{
        studentViewCoursesList,
        setStudentViewCoursesList,
        loadingState,
        setLoadingState,
        studentViewCoursesDetails,
        setStudentViewCoursesDetails,
        currentCourseDetailsID,
        setCurrentCourseDetailsID,
      }}
    >
      {children}
    </studentContext.Provider>
  );
}
