import React, { useEffect, useState } from "react";

const users = [
  { id: 1, name: "ABC", email: "abc@gmail.com", password: "12" },
  { id: 2, name: "DEF", email: "def@gmail.com", password: "1234" },
  { id: 3, name: "GHI", email: "ghi@gmail.com", password: "123456" },
];

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;

    setUserError("");
    setPasswordError("");

    const timer = setTimeout(() => {
      const user = users.find((u) => u.email === email);

      if (!user) {
        console.log("User not found");
        setUserError("User not found");
        setSubmitted(false);
        return;
      }

      if (user.password !== password) {
        console.log("Password Incorrect");
        setPasswordError("Password Incorrect");
        setSubmitted(false);
        return;
      }

      console.log(user);
      setSubmitted(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [submitted, email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();        // 🔥 THIS LINE FIXES IT
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="input-email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p id="user-error">{userError}</p>

        <input
          id="input-password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p id="password-error">{passwordError}</p>

        <button id="submit-form-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
