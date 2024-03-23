'use client'

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can implement your login logic, for demonstration purpose, let's just log the credentials
    console.log('Username:', username);
    console.log('Password:', password);

    if (username.toLowerCase() === "instructor") {
      location.href="/instructor/assignments"
    } else if (username.toLowerCase() === "student") {
      location.href="/student/assignments"
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={[styles['login-form'], "card"].join(" ")}>
        <h1>Login</h1>
        <div className={styles['form-group']}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
