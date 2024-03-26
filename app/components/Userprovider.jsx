"use client";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Userprovider({ children }) {
  const router = useRouter();
  const [cookies] = useCookies([]);

  // if(cookies.token === undefined || cookies.email === undefined) {
  //   router.push("/login")
  // }
return (
  <>
    {children}
  </>
)
}
