"use client";
import { useState } from "react";
import Image from "next/image";
import UserCard from "./UserCard";
import CardLayout from './CardLayout';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    isShowFollowers: true,
    isBio: true,
    showContributions: true,
    showPRs: true,
    prCount: 3,
    layout: "classic" as 'classic' | 'receipt' | 'terminal',
    colorTheme: "default" as 'default' | 'dark',
    showTopRepos: true,
    repoCount: 3,
    showLanguages: true,
    showSocial: true
  });
  const [userData, setUserData] = useState(undefined);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted username:", formData.username);
    // You can now use the username value as needed
    try {
      const response = await fetch(`https://api.github.com/users/${formData.username}`);
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

  const handleChangeLayout = (style: 'classic' | 'receipt' | 'terminal') => {
    setFormData({
      ...formData,
      layout: style
    });
  };


  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <div className={`${isSidebarOpen ? "hidden" : "flex"} block lg:hidden`}>
        <button
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      <main className="w-full h-full flex-grow lg:grid lg:grid-cols-[1fr_3fr] gap-4">
        <div className={`${isSidebarOpen ? "flex" : "hidden"} m-6 lg:flex lg:flex-col lg:w-full p-6 bg-white rounded-lg shadow-lg`}>
          <div className="font-bold text-center">Github Cards</div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Github username</label>
              <input
                value={formData.username}
                onChange={(event) => setFormData({
                  ...formData,
                  username: event.target.value
                })}
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Github Usernam" required />
            </div>
            <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

            <div className="w-full my-4 flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-300">Show Bio</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" onChange={(event) => setFormData({ ...formData, isBio: event.target.checked })} className="sr-only peer" checked={formData.isBio} />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="w-full my-4 flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-300">Followers</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" onChange={(event) => setFormData({ ...formData, isShowFollowers: event.target.checked })} className="sr-only peer" checked={formData.isShowFollowers} />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* <div className="w-full my-4 flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-300">Show Contributions</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(event) => setFormData({ ...formData, showContributions: event.target.checked })}
                  className="sr-only peer"
                  checked={formData.showContributions} />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div> */}

            <div className="w-full my-4 flex items-center justify-between">
              <span className="text-gray-900">Show Languages</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(event) => setFormData({ ...formData, showLanguages: event.target.checked })}
                  className="sr-only peer"
                  checked={formData.showLanguages}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>


            <div className="w-full my-4 flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-300">Show PRs</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(event) => setFormData({ ...formData, showPRs: event.target.checked })}
                  className="sr-only peer"
                  checked={formData.showPRs} />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {formData.showPRs && (
              <div className="bg-slate-300/40 px-3 py-4 rounded-md mb-4">
                <label htmlFor="prCount" className="block mb-2 text-sm font-medium text-gray-900">
                  Number of PRs to show
                </label>
                <select
                  id="prCount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.prCount}
                  onChange={(e) => setFormData({ ...formData, prCount: parseInt(e.target.value) })}
                >
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                </select>
              </div>
            )}

            <div className="rounded-md">
              <div className="mb-4">
                <label htmlFor="colorTheme" className="block mb-2 text-sm font-bold text-gray-900">
                  Color Theme
                </label>
                <select
                  id="colorTheme"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.colorTheme}
                  onChange={(e) => setFormData({ ...formData, colorTheme: e.target.value as 'default' | 'dark' })}
                >
                  <option value="default">Default</option>
                  <option value="dark">Dark Mode</option>
                </select>
              </div>
            </div>

            <div className="font-bold text-black mt-6">Repository Options</div>
            <div className="bg-slate-300/40 p-3 rounded-md">
              <div className="w-full my-4 flex items-center justify-between">
                <span className="text-gray-900">Show Top Repositories</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={(event) => setFormData({ ...formData, showTopRepos: event.target.checked })}
                    className="sr-only peer"
                    checked={formData.showTopRepos}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {formData.showTopRepos && (
                <div className="mb-4">
                  <label htmlFor="repoCount" className="block mb-2 text-sm font-medium text-gray-900">
                    Number of repositories to show
                  </label>
                  <select
                    id="repoCount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.repoCount}
                    onChange={(e) => setFormData({ ...formData, repoCount: parseInt(e.target.value) })}
                  >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                  </select>
                </div>
              )}
            </div>

          </form>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-2 p-3 flex justify-center items-center mx-10">
            <UserCard userData={userData} formData={formData} />
          </div>
          <div className="col-span-1 bg-white p-3 m-10 rounded-lg shadow-lg">
            <CardLayout onSelectStyle={handleChangeLayout} selectedStyle={formData.layout as 'classic' | 'receipt' | 'terminal'} />
          </div>
        </div>
      </main>

      <footer className="flex gap-6 flex-wrap items-center justify-center py-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://profile.catlulu.net"
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
