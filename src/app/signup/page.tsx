"use client";
import { hydrateRoot } from 'react-dom/client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import dynamic from 'next/dynamic'


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "", username: "" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("Signup");

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.error("Signup failed", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTitle(loading ? "Processing" : "Signup");

        if (user.email && user.password && user.username) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user, loading]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 suppressHydrationWarning>{title}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={onSignup}
                disabled={buttonDisabled || loading}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
                    buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {buttonDisabled ? "No Signup" : "Signup"}
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    );
}



