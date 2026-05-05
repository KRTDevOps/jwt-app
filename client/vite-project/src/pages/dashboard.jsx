import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function getUserFromToken(token) {
  if (!token) return { name: "", email: "" };
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return {
      name: payload.name || "",
      email: payload.email || "",
    };
  } catch {
    return { name: "", email: "" };
  }
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const user = getUserFromToken(localStorage.getItem("token"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setData(res.data.msg);
      } catch (error) {
        setError(error?.response?.data?.msg || "Unable to fetch dashboard data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-5 shadow-sm sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Student Management</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200 sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Welcome</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              Hello{user.name ? `, ${user.name}` : ""}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              {user.email ? `Logged in with ${user.email}.` : "You are signed in to the student management system."}
            </p>

            <div className="mt-8 space-y-4 rounded-[1.75rem] bg-slate-50 p-6 text-slate-700 sm:p-8">
              <p className="text-sm font-semibold text-slate-900">Dashboard message</p>
              <p>{error || data}</p>
            </div>
          </section>

          <aside className="space-y-6 rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-900 to-blue-600 p-8 text-white shadow-xl sm:p-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Account</p>
              <p className="mt-4 text-xl font-semibold">{user.name || "User details"}</p>
              <p className="mt-2 text-sm text-slate-200">{user.email || "No email available"}</p>
            </div>

            <div className="rounded-3xl bg-white/10 p-5 text-sm leading-6 text-slate-100 shadow-inner">
              <p className="font-semibold">Session status</p>
              <p className="mt-3 text-slate-200">
                Your session is active while the token remains valid. Use the logout button to end your session.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}