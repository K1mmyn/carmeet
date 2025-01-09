import React, { useState } from "react";
import { register } from "../../api/register";

type RegisterProps = {
  setAuthMode: React.Dispatch<React.SetStateAction<"login" | "register" | "reset-password" | "logged-in">>;
};

const Register: React.FC<RegisterProps> = ({ setAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !username) return alert("Please fill in all required fields");

    const response = await register(username, email, password);

    if (!response.accessToken || !response.refreshToken) {
      return alert("Unable to register");
    }

    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);
    setAuthMode("logged-in");
    setEmail("");
    setPassword("");
    setUsername("");

    return alert("Welcome to Kim's market place");
  };

  return (
    <form className="flex w-full flex-col mb-10" onSubmit={(e) => handleSubmit(e)}>
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
      <label htmlFor="username">Username</label>
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className="text-black"
        type="text"
        name="username"
        id="username-input"
      />
      <button type="submit">Register</button>
      <p onClick={() => setAuthMode("login")} className="cursor-pointer">
        Already have an account?
      </p>
    </form>
  );
};
export default Register;
