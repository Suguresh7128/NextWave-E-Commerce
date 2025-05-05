import { useState, useEffect } from "react";
import { auth, signInWithEmailAndPassword } from "../lib/firebase";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if user is already logged in and redirect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/"); // Redirect to home if user is logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to home or dashboard after successful login
    } catch (error: any) {
      alert(error.message); // Show the error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="border p-2 mb-2 w-full max-w-sm"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="border p-2 mb-2 w-full max-w-sm"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
