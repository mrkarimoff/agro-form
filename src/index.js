import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Form from "./Form";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>
);

// const toastTrigger = document.getElementById("liveToastBtn");
// const toastLiveExample = document.getElementById("liveToast");
// if (toastTrigger) {
//   toastTrigger.addEventListener("click", () => {
//     const toast = new bootstrap.Toast(toastLiveExample);

//     toast.show();
//   });
// }
