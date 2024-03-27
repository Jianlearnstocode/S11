"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
export default function LoginForm() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("https://assessment-server-r6hy.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      setMsg(json.detail);
      setIsLoading(false);
      setCookie("token", json.token);
      setCookie("email", json.email);
      if(json.token){
        router.push("/")
      }
    } catch (error) {
      setIsLoading(false);
      setMsg('Error signing in, please check your credentials');
    }
  };
  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-white">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                type="email"
                required
                className="block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                required
                className="block w-full rounded-md border-0 bg-white/5 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isloading}
              className="flex w-full justify-center disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {isloading ? "Loading..." : "Sign in"}
            </button>
            <span className="inline-block my-4 text-xs text-white ">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600">
                Sign up
              </Link>
            </span>
          </div>
        </form>
        {msg && <p className="text-red-500">{msg}</p>}
      </div>
    </div>
  );
}