import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { auth } from "../lib/firebase"; // Make sure path is correct
import { onAuthStateChanged, signOut } from "firebase/auth";

// Define the Product type
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fetch products from server
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await response.json();

  return {
    props: { products },
  };
};

const Home = ({ products }: { products: Product[] }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Optional: force re-render
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      {/* Header */}
      <header className="w-full flex justify-end gap-4">
        {user ? (
          <button onClick={handleLogout} className="text-red-600 underline">
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="text-blue-600 underline">
              Login
            </Link>
            <Link href="/signup" className="text-blue-600 underline">
              Sign Up
            </Link>
          </>
        )}
      </header>

      {/* Main */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-semibold">Product Listing</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={150}
                height={150}
                className="object-contain"
              />
              <h2 className="text-lg font-medium mt-4">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-semibold mt-2">${product.price}</p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </a>
      </footer>
    </div>
  );
};

export default Home;
