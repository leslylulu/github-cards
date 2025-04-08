"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import UserCard from "./UserCard";
import CardLayout from './CardLayout';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  // 检测是否为移动设备
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初始化检查
    checkIfMobile();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', checkIfMobile);
    
    // 清理函数
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // 移动设备上点击卡片区域自动收起侧边栏
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setIsSidebarOpen(false);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`https://api.github.com/users/${formData.username}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
      
      // 在移动设备上自动收起侧边栏以展示结果
      if (isMobile) {
        setIsSidebarOpen(false);
      }
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
      <div className="sticky top-0 z-10 md:hidden bg-white shadow-sm p-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">GitHub Cards</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      <main className="w-full h-full flex-grow md:grid md:grid-cols-[1fr_3fr] gap-4">
        {/* 侧边栏 */}
        <div 
          id="sidebar"
          className={`
            ${isSidebarOpen ? "fixed inset-0 pt-16 z-[5] bg-white/90 backdrop-blur-sm overflow-auto" : "hidden"} 
            md:static md:block md:pt-0 md:z-auto md:bg-transparent md:backdrop-filter-none
            px-6 py-4 md:m-6 md:p-6 md:bg-white md:rounded-lg md:shadow-lg
            transition-all duration-300
          `}
        >
          <div className="font-bold text-center mb-4 md:mb-6 text-xl">GitHub Card Generator</div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                GitHub username
              </label>
              <div className="flex">
                <input
                  value={formData.username}
                  onChange={(event) => setFormData({
                    ...formData,
                    username: event.target.value
                  })}
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter GitHub username" 
                  required 
                />
                <button 
                  type="submit" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-5 py-2.5"
                >
                  Go
                </button>
              </div>
            </div>

            {/* Display Options 分组 */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <h2 className="font-semibold text-gray-900">Display Options</h2>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-900 text-sm">Show Bio</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    onChange={(event) => setFormData({ ...formData, isBio: event.target.checked })} 
                    className="sr-only peer" 
                    checked={formData.isBio} 
                  />
                  <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-900 text-sm">Show Stats</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    onChange={(event) => setFormData({ ...formData, isShowFollowers: event.target.checked })} 
                    className="sr-only peer" 
                    checked={formData.isShowFollowers} 
                  />
                  <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-900 text-sm">Show Languages</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    onChange={(event) => setFormData({ ...formData, showLanguages: event.target.checked })} 
                    className="sr-only peer" 
                    checked={formData.showLanguages} 
                  />
                  <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Repositories 分组 */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <h2 className="font-semibold text-gray-900">Repositories</h2>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-900 text-sm">Show Top Repos</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    onChange={(event) => setFormData({ ...formData, showTopRepos: event.target.checked })} 
                    className="sr-only peer" 
                    checked={formData.showTopRepos} 
                  />
                  <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {formData.showTopRepos && (
                <div>
                  <label htmlFor="repoCount" className="block mb-1 text-xs font-medium text-gray-700">
                    Number of repositories
                  </label>
                  <select
                    id="repoCount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={formData.repoCount}
                    onChange={(e) => setFormData({ ...formData, repoCount: parseInt(e.target.value) })}
                  >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                  </select>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-gray-900 text-sm">Show PRs</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    onChange={(event) => setFormData({ ...formData, showPRs: event.target.checked })} 
                    className="sr-only peer" 
                    checked={formData.showPRs} 
                  />
                  <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {formData.showPRs && (
                <div>
                  <label htmlFor="prCount" className="block mb-1 text-xs font-medium text-gray-700">
                    Number of PRs
                  </label>
                  <select
                    id="prCount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={formData.prCount}
                    onChange={(e) => setFormData({ ...formData, prCount: parseInt(e.target.value) })}
                  >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                  </select>
                </div>
              )}
            </div>
            
            {/* Theme 设置 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label htmlFor="colorTheme" className="block mb-2 text-sm font-medium text-gray-900">
                Color Theme
              </label>
              <select
                id="colorTheme"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.colorTheme}
                onChange={(e) => setFormData({ ...formData, colorTheme: e.target.value as 'default' | 'dark' })}
              >
                <option value="default">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>
          </form>
        </div>
        
        {/* 卡片显示区域 */}
        <div className="flex flex-col md:grid md:grid-cols-3 p-4">
          <div className="col-span-2 p-3 flex justify-center items-center">
            <UserCard userData={userData} formData={formData} />
          </div>
          <div className="col-span-1 bg-white p-3 mt-4 md:mt-10 rounded-lg shadow-lg">
            <CardLayout onSelectStyle={handleChangeLayout} selectedStyle={formData.layout} />
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="flex gap-3 md:gap-6 flex-wrap items-center justify-center p-4 md:py-6 text-sm border-t mt-auto">
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
          <span>My website</span>
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/yourusername/github-cards"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
        <p>© 2025 Lulu - All rights reserved.</p>
      </footer>
    </div>
  );
}