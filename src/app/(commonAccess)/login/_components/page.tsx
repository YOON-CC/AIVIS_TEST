"use client";

import { useState } from "react";
// import styles from "./page.module.css";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      const shortTermToken = data.shortTermToken;

      localStorage.setItem("token", token);
      localStorage.setItem("shortTermToken", shortTermToken);
    } else {
      console.log("로그인 실패");
    }
  };

  return (
    <main>
      <div>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>로그인</button>
      </div>
    </main>
  );
}
