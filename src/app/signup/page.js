"use client"; // Indicates this is a Client Component

import { useState } from "react";
import { auth } from "@/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import Link from "next/link";
const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "successfully registered"
      });
      router.push('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'User Already Exists With this Email!',
      })
    }
  };

  return (
<>      <Navbar/>
<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
    <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">Teacher  Registration</h2>
    <form onSubmit={handleSignup} class="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
      />
      <button
        type="submit"
        class="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition duration-200 transform hover:scale-105"
      >
        Signup
      </button>
      <div class="text-center mt-4">
        <Link
          href="/login"
          class="text-indigo-500 hover:underline hover:text-indigo-600 transition duration-200"
        >
          Already have an account?
        </Link>
      </div>
    </form>
  </div>
</div>

      </>
  );
};

export default AdminSignup;
