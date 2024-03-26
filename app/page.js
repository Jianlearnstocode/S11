"use client";
import { useState, useEffect } from "react";
import TodoApp from "./components/Todo";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Home() {
  const router = useRouter();
  const  [isLoading, setIsLoading] = useState();
  const [data, setData] = useState(null);
  const [cookies] = useCookies();

  async function getTodos() {
    try {
      const res = await fetch(`https://assessment-server-r6hy.onrender.com/todos/${cookies.email}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      setData(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Check if cookies.email and cookies.token are falsy (undefined or empty)
    if (cookies.email == undefined || cookies.token == undefined) {
      router.push("/login");
    }
      getTodos();

    /*  */
  }, [ cookies.email, cookies.token ]);

  return (
    <section className="relative flex flex-col">
      <div className="bg-[url('/bg-mobile-dark.jpg')] min-h-[19rem] bg-no-repeat bg-cover md:bg-[url('/bg-desktop-dark.jpg')]"></div>
      {data && <TodoApp data={data} />}
    </section>
  );
}