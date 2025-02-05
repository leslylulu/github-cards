"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted username:", username);
    // You can now use the username value as needed
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("GitHub user data:", data);
      setUserData(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-2 pb-8 gap-3 sm:p-3 font-[family-name:var(--font-geist-sans)]">
      <div className={`${isSidebarOpen ? "hidden" : "flex"} block lg:hidden`}>
        <button
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      <main className="w-full h-full flex-grow lg:grid lg:grid-cols-[1fr_3fr] gap-4 p-6">
        <div className={`${isSidebarOpen ? "flex" : "hidden"} lg:flex lg:flex-col lg:w-full `}>
          <div className="font-bold text-center">Github Cards</div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Github username</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Github Usernam" required />
            </div>
            <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>


        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-2 bg-gray-800/10 p-3 flex justify-center items-center">I am a card</div>
          <div className="col-span-1 bg-purple-500/25 p-3">I am a right side</div>
        </div>
      </main>

      <footer className="flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Github Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          My website
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Explore more nextjs.org →
        </a>
        <p>© 2025 Lulu - All rights reserved.</p>
      </footer>
    </div>
  );
}
