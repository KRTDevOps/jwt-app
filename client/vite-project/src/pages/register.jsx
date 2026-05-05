import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });

      setMessage("Registration successful. Redirecting to login...");
      setError("");
      setTimeout(() => nav("/"), 1200);
    } catch (error) {
      setError(error?.response?.data?.msg || "Registration failed.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-10 lg:flex-row lg:items-center">
        <div className="lg:w-1/2">
          <p className="text-sm uppercase tracking-[0.3em] text-green-600">Create Account</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Register for access</h1>
          <p className="mt-4 text-slate-600">Create your account to log in and access the secure dashboard.</p>
        </div>

        <div className="lg:w-1/2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Register</h2>
            <div className="mt-6 space-y-4">
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              {message && <p className="text-sm text-green-600">{message}</p>}
              <button
                onClick={handleRegister}
                className="w-full rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Register
              </button>
            </div>
            <p className="mt-5 text-center text-sm text-slate-600">
              Already have an account? <a href="/" className="font-semibold text-blue-600 underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
