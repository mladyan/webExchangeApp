import React from "react";

export default function LoginFormComponent({
  form,
  setForm,
  error,
  handleSubmit,
}) {
  return (
    <div className="login-form-container">
      <p className="bold">eMenjačnica</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}
