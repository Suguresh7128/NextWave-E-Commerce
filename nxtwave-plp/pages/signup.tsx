import { useState, useEffect } from "react";
import { auth, createUserWithEmailAndPassword } from "../lib/firebase";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

const SignUp = () => {
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

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to home or dashboard after successful signup
    } catch (error: any) {
      alert(error.message); // Show the error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSignUp}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
};

export default SignUp;
