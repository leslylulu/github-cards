"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { toPng } from 'html-to-image';
import { FaGithub, FaUserFriends, FaUserPlus, FaCodeBranch, FaStar, FaUser } from 'react-icons/fa';

interface UserCardProps {
  userData?: {
    avatar_url?: string;
    login: string;
    name: string;
    bio: string;
    created_at: string;
    followers: number;
    following: number;
    public_repos: number;
    html_url: string;
  };
  formData: {
    username: string;
    isShowFollowers: boolean;
    isBio: boolean;
    showPRs: boolean;
		prCount: number;
    layout: 'classic' | 'receipt' | 'terminal';
    colorTheme: 'default' | 'dark';
    showTopRepos: boolean;
    repoCount: number;
    showLanguages: boolean;
    showSocial: boolean;
  }
}

interface PullRequest {
	id: number;
	html_url: string;
	title: string;
	state: string;
	created_at: string;
	user?: {
		login: string;
		avatar_url: string;
	};
	repository_url?: string;
}

interface Repository {
	id: number;
	name: string;
	html_url: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	created_at: string;
	updated_at: string;
	owner: {
		login: string;
		avatar_url: string;
	};
}


const UserCard: React.FC<UserCardProps> = ({ userData, formData }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { username, isShowFollowers, isBio, showPRs } = formData;
	const [prData, setPrData] = useState<PullRequest[]>([]);
	const [topRepos, setTopRepos] = useState<Repository[]>([]);
  const [languages, setLanguages] = useState<{[key: string]: number}>({});
  
  const getThemeClasses = () => {
    switch (formData.colorTheme) {
      case 'dark':
        return {
          background: 'bg-black',
          text: 'text-white',
					cardBg: 'bg-black',
          highlight: 'bg-blue-600',
          secondary: 'text-gray-300',
          border: 'border-gray-600',
          button: 'bg-blue-600 hover:bg-blue-700',
        };
      default:
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          cardBg: 'bg-white',
          highlight: 'bg-blue-500',
          secondary: 'text-gray-600',
          border: 'border-gray-200',
          button: 'bg-blue-500 hover:bg-blue-600',
        };
    }
  };
  
  const theme = getThemeClasses();



  const handleDownloadImage = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${username}-Github-${formData.layout}.png`;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

	

  useEffect(() => {
    const fetchPrs = async () => {
      if (!formData.showPRs || !username) return;
      try {
        const response = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`);
        const data = await response.json();
        setPrData(data.items || []);
      } catch (error) {
        console.error("Error fetching PRs:", error);
      }
    };
    fetchPrs();
  }, [formData.showPRs, username]);

  useEffect(() => {
    if (!formData.showTopRepos || !username) return;
    
    const fetchTopRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=${formData.repoCount}`);
        const data = await response.json();
        setTopRepos(data || []);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    
    fetchTopRepos();
  }, [formData.showTopRepos, username, formData.repoCount]);

  useEffect(() => {
    if (!formData.showLanguages || !username) return;
    
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        
        const langMap: {[key: string]: number} = {};
        for (const repo of repos) {
          if (repo.language && !langMap[repo.language]) {
            langMap[repo.language] = 0;
          }
          if (repo.language) {
            langMap[repo.language]++;
          }
        }
        
        setLanguages(langMap);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    
    fetchLanguages();
  }, [formData.showLanguages, username]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };


  const renderClassicLayout = () => {
    return (
      <div className="w-full">
        <div className={`${theme.cardBg} p-3 shadow-lg rounded-lg ${theme.text} ${theme.border} border`} ref={cardRef}>
          <div className="flex gap-3 w-full items-center mx-3 my-6">
						{/* <Image src={userData?.avatar_url} alt={`${username}&apos;s avatar`} width={80} height={80} className="w-20 h-20 rounded-full" /> */}
						{userData?.avatar_url ? (
							<Image
								src={userData.avatar_url}
								alt={`${username}'s avatar`}
								width={80}
								height={80}
								className="w-20 h-20 rounded-full"
							/>
						) : (
							<div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
								<FaUser className="text-4xl" />
							</div>
						)}
            <div>
              <h2 className="text-xl font-bold">{username}</h2>
              <p className={theme.secondary}>@{userData?.name}</p>
              {isBio && <p>{userData?.bio}</p>}
              <p className={theme.secondary}>Created: {formatDate(userData?.created_at)}</p>
            </div>
          </div>

          <div className="m-3 grid grid-cols-3 gap-4">
            {isShowFollowers && (
              <div className={`flex gap-3 items-center bg-lime-200/45 rounded-lg p-3 ${formData.colorTheme === 'dark' ? 'bg-lime-900/45' : ''}`}>
                <FaUserFriends className="text-2xl" />
                <div className="flex-col">
                  <p className="font-extrabold text-lg">{userData?.followers}</p>
                  <p className={theme.text}>Followers</p>
                </div>
              </div>
            )}
            {isShowFollowers && (
              <div className={`flex gap-3 items-center bg-yellow-200/40 rounded-lg p-3 ${formData.colorTheme === 'dark' ? 'bg-yellow-900/40' : ''}`}>
                <FaUserPlus className="text-2xl" />
                <div className="flex-col">
                  <p className="font-extrabold text-lg">{userData?.following}</p>
                  <p className={theme.text}>Following</p>
                </div>
              </div>
            )}
            {isShowFollowers && (
              <div className={`flex gap-3 items-center bg-purple-500/40 rounded-lg p-3 ${formData.colorTheme === 'dark' ? 'bg-purple-900/40' : ''}`}>
                <FaCodeBranch className="text-2xl" />
                <div className="flex-col">
                  <p className="font-extrabold text-lg">{userData?.public_repos}</p>
                  <p className={theme.text}>Public Repos</p>
                </div>
              </div>
            )}
          </div>

					{formData.showLanguages && Object.keys(languages).length > 0 && (
						<div className="mt-4 px-3">
							<h3 className="text-lg font-bold">Languages</h3>
							<div className="flex flex-wrap gap-2 mt-2">
								{Object.entries(languages).map(([language, count]) => (
									<span key={language} className={`text-sm px-2 py-1 rounded ${formData.colorTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
										{language} ({count})
									</span>
								))}
							</div>
						</div>
					)}
				
			
					{formData.showTopRepos && topRepos.length > 0 && (
						<div className="mt-4 px-3">
							<h3 className="text-lg font-bold mb-3">Top Repositories</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
								{topRepos.map(repo => (
									<div 
										key={repo.id} 
										className={`p-3 rounded-lg shadow-sm border ${theme.border} hover:shadow-md transition-shadow`}
									>
										<div className="flex justify-between items-start mb-2">
											<a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`text-${theme.highlight} hover:underline font-medium truncate max-w-[80%]`}>
												{repo.name}
											</a>
											<div className="flex items-center">
												<FaStar className="text-yellow-500 mr-1" />
												<span className="text-sm">{repo.stargazers_count}</span>
											</div>
										</div>
										{repo.language && (
											<span className={`inline-block text-xs px-2 py-1 rounded ${formData.colorTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
												{repo.language}
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}
         
          
          
          {/* Show PRs */}
          {showPRs && prData?.length > 0 && (
            <div className="mt-4 px-3">
              <h3 className="text-lg font-bold">Pull Requests</h3>
              <ul className="mt-3">
								{prData.slice(0, formData.prCount).map(pr => ( 
                  <li key={pr.id} className="mb-2 flex justify-between">
                    <a href={pr.html_url} target="_blank" rel="noopener noreferrer" className={`text-${theme.highlight} hover:underline`}>
                      <span className={`font-bold uppercase mr-3 ${pr.state === 'open' ? 'text-purple-600' : 'text-green-800'}`}>{pr.state}</span>
                      {pr.title}
                    </a>
                    <p className={theme.secondary}>
                      {formatDate(pr.created_at)}
                    </p>
                  </li>
                ))}
								{prData.length > formData.prCount && (
									<li className="text-center text-sm text-gray-500">...and {prData.length - formData.prCount} more</li>
								)}
              </ul>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-4 items-center justify-center">
          <a href={userData?.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            View Profile
          </a>
          <button
            onClick={handleDownloadImage}
            className={`px-4 py-2 ${theme.button} text-white rounded-md`}
          >
            Download as Image
          </button>
        </div>
      </div>
    );
  };

	// Receipt Layout with reduced spacing
	const renderReceiptLayout = () => {
		return (
			<div className="w-full max-w-md mx-auto font-mono">
				<div className={`${theme.cardBg} border ${theme.border} p-4 shadow-md ${theme.text}`} ref={cardRef}>
					<div className="text-center border-b-2 border-dashed border-gray-300 pb-2 mb-2">
						<FaGithub className="mx-auto text-3xl mb-2" />
						<h2 className="uppercase tracking-widest text-base">GitHub Receipt</h2>
						<p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
					</div>
					
					<div className="mb-3 space-y-1">
						<div className="flex justify-between mb-1">
							<span className={theme.secondary}>User:</span>
							<span className="font-bold">{userData?.login}</span>
						</div>
						<div className="flex justify-between mb-1">
							<span className={theme.secondary}>Name:</span>
							<span>{userData?.name || 'N/A'}</span>
						</div>
						{isBio && (
							<div className="flex flex-col mb-1">
								<span className={theme.secondary}>Bio:</span>
								<span className="text-right text-xs line-clamp-2">{userData?.bio}</span>
							</div>
						)}
						<div className="flex justify-between mb-1">
							<span className={theme.secondary}>Created:</span>
							<span className="text-sm">{formatDate(userData?.created_at)}</span>
						</div>
					</div>
					
					{isShowFollowers && (
						<div className="border-t border-dashed border-gray-300 pt-2 mb-2">
							<div className="flex justify-between mb-1">
								<span>Repositories:</span>
								<span className="font-bold">{userData?.public_repos}</span>
							</div>
							<div className="flex justify-between mb-1">
								<span>Followers:</span>
								<span className="font-bold">{userData?.followers}</span>
							</div>
							<div className="flex justify-between mb-1">
								<span>Following:</span>
								<span className="font-bold">{userData?.following}</span>
							</div>
						</div>
					)}

					{formData.showLanguages && Object.keys(languages).length > 0 && (
						<div className="border-t border-dashed border-gray-300 pt-2 mb-2">
							<div className="flex justify-between mb-1">
								<span>LANGUAGES</span>
								<span className="font-bold">{Object.keys(languages).length}</span>
							</div>
							<div className="grid grid-cols-2 gap-3">
								{Object.entries(languages).slice(0, 6).map(([lang, count]) => (
									<div key={lang} className="text-xs mb-1">
										<div className="flex justify-between">
											<span>{lang}</span>
											<span>x{count}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{showPRs && prData?.length > 0 && (
						<div className="border-t border-dashed border-gray-300 pt-2 mb-2">
							<div className="flex justify-between mb-1">
								<span>PULL REQUESTS</span>
								<span className="font-bold">{prData.length}</span>
							</div>
							{prData.slice(0, Math.min(3, formData.prCount)).map(pr => (
								<div key={pr.id} className="text-xs mb-0.5">
									<div className="flex justify-between">
										<span className="truncate max-w-[70%]">{pr.title.substring(0, 20)}{pr.title.length > 20 ? '...' : ''}</span>
										<span className="uppercase">{pr.state}</span>
									</div>
								</div>
							))}
							{prData.length > Math.min(3, formData.prCount) && (
								<div className="text-center text-xs">...and {prData.length - Math.min(3, formData.prCount)} more</div>
							)}
						</div>
					)}

					
					{formData.showTopRepos && topRepos.length > 0 && (
						<div className="border-t border-dashed border-gray-300 pt-2 mb-2">
							<div className="flex justify-between mb-1">
								<span>TOP REPOSITORIES</span>
								<span className="font-bold">{topRepos.length}</span>
							</div>
							{topRepos.slice(0, 3).map((repo) => (
								<div key={repo.id} className="text-xs mb-0.5">
									<div className="flex justify-between">
										<span className="truncate max-w-[70%]">{repo.name}</span>
										<span>★ {repo.stargazers_count}</span>
									</div>
								</div>
							))}
						</div>
					)}
					
					<div className="border-t border-dashed border-gray-300 pt-2 text-center">
						<p className="text-xs uppercase tracking-wider mb-1">Thank you for using GitHub</p>
						<a href={userData?.html_url} className="text-xs text-gray-500 hover:underline">github.com/{userData?.login}</a>
					</div>
				</div>
				
				<div className="flex gap-4 mt-4 items-center justify-center">
					<button
						onClick={handleDownloadImage}
						className={`px-4 py-2 ${theme.button} text-white rounded-md`}
					>
						Download Receipt
					</button>
				</div>
			</div>
		);
	};

		// Terminal Layout with reduced vertical spacing
	const renderTerminalLayout = () => {
		return (
			<div className="w-full max-w-lg mx-auto">
				<div className="bg-gray-900 text-green-500 font-mono rounded-lg shadow-xl p-4 border border-green-500" ref={cardRef}>
					<div className="flex items-center mb-3">
						<div className="flex space-x-2">
							<div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
							<div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
							<div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
						</div>
						<p className="ml-3 text-green-300 text-xs">github-profile.sh</p>
					</div>
					
					<div className="space-y-1.5">
						<p><span className="text-purple-400">$</span> git user <span className="text-yellow-300">--info</span> {userData?.login}</p>
						<div className="ml-3 mb-1.5">
							<p><span className="text-blue-400">name:</span> {userData?.name || 'N/A'}</p>
							<p><span className="text-blue-400">username:</span> {userData?.login}</p>
							{isBio && <p className="line-clamp-2"><span className="text-blue-400">bio:</span> {userData?.bio || 'N/A'}</p>}
							<p><span className="text-blue-400">created:</span> {formatDate(userData?.created_at)}</p>
						</div>
						
						{isShowFollowers && (
							<>
								<p><span className="text-purple-400">$</span> git stats <span className="text-yellow-300">--summary</span></p>
								<div className="ml-3 mb-1.5 grid grid-cols-3">
									<p><span className="text-blue-400">repos:</span> {userData?.public_repos}</p>
									<p><span className="text-blue-400">followers:</span> {userData?.followers}</p>
									<p><span className="text-blue-400">following:</span> {userData?.following}</p>
								</div>
							</>
						)}

						{formData.showLanguages && Object.keys(languages).length > 0 && (
							<>
								<p><span className="text-purple-400">$</span> git lang <span className="text-yellow-300">--count</span></p>
								<div className="ml-3 mb-1.5">
									<div className="grid grid-cols-2 md:grid-cols-3 gap-x-3">
										{Object.entries(languages).map(([language, count]) => (
											<p key={language} className="text-sm">
												<span className="text-blue-400">{language}:</span> {count}
											</p>
										))}
									</div>
								</div>
							</>
						)}
						
						{formData.showTopRepos && topRepos.length > 0 && (
							<>
								<p><span className="text-purple-400">$</span> git repo <span className="text-yellow-300">--list --sort=stars</span></p>
								<div className="ml-3 mb-1.5">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
										{topRepos.slice(0, formData.repoCount).map(repo => (
											<p key={repo.id} className="text-sm truncate">
												<span className="text-blue-400">{repo.name}</span>{repo.language ? ` [${repo.language}]` : ''} <span className="text-yellow-400 ml-1">★{repo.stargazers_count}</span>
											</p>
										))}
									</div>
								</div>
							</>
						)}
						
						{showPRs && prData?.length > 0 && (
							<>
								<p><span className="text-purple-400">$</span> git pr <span className="text-yellow-300">--list --limit={formData.prCount}</span></p>
								<div className="ml-3 mb-1.5">
									{prData.slice(0, formData.prCount).map(pr => (
										<p key={pr.id} className="text-sm truncate">
											<span className={`mr-1 ${pr.state === 'open' ? 'text-green-400' : 'text-red-400'}`}>
												[{pr.state}]
											</span>
											{pr.title.substring(0, 40)}{pr.title.length > 40 ? '...' : ''}
										</p>
									))}
									{prData.length > formData.prCount && <p className="text-xs text-gray-500">...and {prData.length - formData.prCount} more</p>}
								</div>
							</>
						)}
						
						<p><span className="text-purple-400">$</span> git open <span className="text-yellow-300">--profile</span> {userData?.login}</p>
						<p>$ <span className="bg-green-500 w-1.5 h-3.5 inline-block animate-pulse">&nbsp;</span></p>
					</div>
				</div>
				
				<div className="flex gap-4 mt-4 items-center justify-center">
					<a href={userData?.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
						<span className="text-purple-500">$</span> View Profile
					</a>
					<button
						onClick={handleDownloadImage}
						className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
					>
						Download Terminal
					</button>
				</div>
			</div>
		);
	};
  const renderPlaceholder = () => {
    return (
      <div className="flex-col justify-center items-center">
        <h4 className="font-bold text-center text-2xl mb-6">Github Cards</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <FaGithub className="mr-2" />
						<p>View users&apos; profile in Github</p>
          </div>
        </div>
      </div>
    );
  };

  const renderCard = () => {
    if (!userData || !userData.avatar_url) {
      return renderPlaceholder();
    }

    switch (formData.layout) {
      case 'receipt':
        return renderReceiptLayout();
      case 'terminal':
        return renderTerminalLayout();
      case 'classic':
      default:
        return renderClassicLayout();
    }
  };

  return <>{renderCard()}</>;
};

export default UserCard;