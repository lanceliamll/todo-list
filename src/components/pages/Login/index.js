import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../../../helpers/env";
import { store, updateStore } from "fluxible-js";

function Login(props) {
  const [form, setForm] = useState({ email: "", password: "" });
  const history = useHistory();

  console.log(store);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(form);

    const { email, password } = form;

    if (!email && password) return;

    // post request
    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Res", res);
        updateStore({
          user: res
        });
        // if email is verified redirect to todos
        if(res?.user?.emailVerifiedAt) {
          history.push("/todo");
          updateStore({
            user: res
          })
        } else {
          history.push("/verify", {
             token: res.authToken
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="login-container">
      {/* Form */}
      <form onSubmit={handleLogin}>
        {/* Email */}
        <label>
          Email:
          <input
            type="text"
            value={form.email}
            name="email"
            onChange={handleInputChange}
          />
        </label>

        {/* Password */}

        <label>
          Password:
          <input
            type="password"
            value={form.password}
            name="password"
            onChange={handleInputChange}
          />
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
