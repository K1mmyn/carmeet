import React, { useState } from "react";
import { login } from "../../api/login";

type LoginProps = {
  setAuthMode: React.Dispatch<React.SetStateAction<"login" | "register" | "reset-password" | "logged-in">>;
};

const Login: React.FC<LoginProps> = ({ setAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return alert("Please fill in all required fields");

    const response = await login(email, password);

    if (!response.accessToken || !response.refreshToken) {
      return alert("Unable to register");
    }

    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);
    setAuthMode("logged-in");

    setEmail("");
    setPassword("");

    return alert("Welcome back");
  };

  return (
    <form className="flex w-full flex-col mb-10" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="text-black"
        type="text"
        name="email"
        id="email-input"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="text-black"
        type="text"
        name="password"
        id="password-input"
      />
      <button type="submit">Log in</button>
      <div className="flex justify-between">
        <p className="cursor-pointer" onClick={() => setAuthMode("register")}>
          Create an Account?
        </p>
        <p className="cursor-pointer" onClick={() => setAuthMode("reset-password")}>
          Forgot Password
        </p>
      </div>
    </form>
  );
};
export default Login;
