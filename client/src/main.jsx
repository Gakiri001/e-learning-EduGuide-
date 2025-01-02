import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/Auth-context/index.jsx";
import InstructorProvider from "./Context/intructor-context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <App />
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>,
);
