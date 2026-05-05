import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (error) {
      setError(error?.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 lg:grid-cols-[1.2fr_1fr] lg:p-10">
        <section className="flex flex-col justify-center rounded-[1.75rem] bg-gradient-to-br from-slate-900 via-blue-900 to-blue-600 p-8 text-white shadow-xl sm:p-10">
          <span className="text-sm uppercase tracking-[0.35em] text-sky-200">Student Management</span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Welcome back.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
            Sign in to access the secure dashboard, view student records, and manage your school operations from one place.
          </p>
          <div className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6 text-sm text-slate-100 shadow-lg">
            <p className="font-semibold">Quick tips</p>
            <ul className="space-y-2 text-slate-200">
              <li>Use your registered email.</li>
              <li>Keep your password secure.</li>
              <li>Need an account? Register now.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-slate-900">Login</h2>
          <p className="mt-2 text-sm text-slate-600">Enter your account details to continue.</p>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your password"
              />
            </label>

            {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            <button
              onClick={handleLogin}
              className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Sign in
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Register
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}