'use client'

import { GlobalContext } from "@/context/Index"
import { useContext } from "react"

export default function Home() {

  const {isAuthUser} = useContext(GlobalContext);
  console.log(isAuthUser);

  return (
    <div className='text-3xl'>Home</div>
  )
}
