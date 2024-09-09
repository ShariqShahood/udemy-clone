"use client"; // Indicates this is a Client Component

import { useState } from "react";
import { auth } from "@/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
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
          title: "login successfully"
        });
        router.push('/dashboard');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: 'Invalid email or password!',
        })      
      }
    };
  
    return (
      <>
        <Navbar/>
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
    <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
    <form onSubmit={handleLogin} class="space-y-4">
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
        <a
          href="/signup"
          class="text-indigo-500 hover:underline hover:text-indigo-600 transition duration-200"
        >
          Create One! SignUp 
        </a>
      </div>
    </form>
  </div>
</div>

      </>
    );
  };
  
  export default AdminLogin;