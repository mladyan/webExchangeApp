import { useState } from "react";
import { useRouter } from "next/router";
import LoginFormComponent from "../components/LoginFormComponent.jsx";
import "../app/globals.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } else {
      setError(data.error);
    }
  };

  return (
    <LoginFormComponent
      form={form}
      setForm={setForm}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
}
