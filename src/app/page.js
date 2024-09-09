"use client"; // Indicates this is a Client Component
// import Image from "next/image";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
      <>
      <Navbar />
      <h1 className="text-purple-700">Hello World</h1>
      </>
  );
}
