import './Login.css';
import React, { useState } from "react";

function Login(props) {
    const [creds, setCreds] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        firstname: "",
        lastname: ""
    });

//  This is code from Hoikin (Unsure if it is needed so I am leaving it commented out for now due to merge conflict)
//     const [error, msg] = useState("");
//     const isSignup = props.buttonLabel === "Sign Up";

//     return (
//         <form>
//             <label htmlFor="email">Email</label>
//             <input
//                 type="text"
//                 name="email"
//                 id="email"
//                 value={creds.email}
//                 onChange={handleChange}
//             />
//             <label htmlFor="password">Password</label>
//             <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={creds.password}
//                 onChange={handleChange}
//             />
//             {isSignup && (
//                 <>
//                     <label htmlFor="confirmpassword">Confirm Password</label>
//                     <input
//                         type="password"
//                         name="confirmpassword"
//                         id="confirmpassword"
//                         value={creds.confirmpassword}
//                         onChange={handleChange}
//                     />
//                     <label htmlFor="firstname">
//                         {" "}
//                         First Name
//                     </label>
//                     <input
//                         type="text"
//                         name="firstname"
//                         id="firstname"
//                         value={creds.firstname}
//                         onChange={handleChange}
//                     />
//                     <label htmlFor="lastname">Last Name</label>
//                     <input
//                         type="text"
//                         name="lastname"
//                         id="lastname"
//                         value={creds.lastname}
//                         onChange={handleChange}
//                     />
//                 </>
//             )}
//             {error && <p>{error}</p>}
//             <input
//                 type="button"
//                 value={props.buttonLabel || "Log In"}
//                 onClick={submitForm}
//             />
//         </form>
//     );

//     function handleChange(event) {
//         const { name, value } = event.target;
//         switch (name) {
//             case "email":
//                 setCreds({ ...creds, email: value });
//                 break;
//             case "password":
//                 setCreds({ ...creds, password: value });
//                 break;
//             case "confirmpassword":
//                 setCreds({...creds, confirmpassword: value});
//                 break;
//             case "firstname":
//                 setCreds({ ...creds, firstname: value });
//                 break;
//             case "lastname":
//                 setCreds({ ...creds, lastname: value });
//                 break;
//         }
//     }

//     function submitForm() {
//         msg("");
//         if(isSignup && creds.password !== creds.confirmpassword){
//             msg("Passwords do not match");
//             return;
//         }

//         props.handleSubmit(creds);
//         setCreds({
//             email: "",
//             password: "",
//             firstname: "",
//             lastname: ""
//         });
//     }
  function handleChange(event) {
    const { name, value } = event.target;
    setCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submitForm(e) {
    e.preventDefault();
    props.handleSubmit(creds);
    setCreds({ email: "", pwd: "" });
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Chore Core</h1>
        <h2 className="login-subtitle">Sign in</h2>
        <p className="login-subtext">Enter your email and password to sign in</p>

        <form className="login-form" onSubmit={submitForm}>
          <input
            type="text"
            name="email"
            placeholder="email@domain.com"
            value={creds.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="pwd"
            placeholders="password"
            value={creds.pwd}
            onChange={handleChange}
          />
          <button type="submit">Continue</button>
          <button type="button" onClick={() => window.location.href = "/signup"}>
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
