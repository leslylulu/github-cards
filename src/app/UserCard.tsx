"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { toPng } from 'html-to-image';
import { FaGithub, FaShareAlt, FaUserFriends, FaUserPlus, FaCodeBranch } from 'react-icons/fa';

interface UserCardProps {
	userData?: {
		avatar_url: string;
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
	}
}

const UserCard: React.FC<UserCardProps> = ({ userData, formData }) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const { username, isShowFollowers, isBio, showPRs } = formData;
	const [prData, setPrData] = React.useState<{ id: number; title: string; html_url: string; created_at: string, state: string }[]>([]);


	const handleDownloadImage = async () => {
		if (cardRef.current) {
			try {
				const dataUrl = await toPng(cardRef.current);
				const link = document.createElement('a');
				link.href = dataUrl;
				link.download = 'user-card.png';
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
				setPrData(data.items);
			} catch (error) {
				console.error("Error fetching PRs:", error);
			}
		};
		fetchPrs();
	}, [formData.showPRs, username]);


	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	};


	return (
		<>
			{
				userData && userData?.avatar_url ? <div className="w-full">
					<div className="bg-white p-3 shadow-lg rounded-lg" ref={cardRef}>
						{/* header */}
						<div className="flex gap-3 w-full items-center mx-3 my-6">
							<Image src={userData?.avatar_url} alt={`${userData?.login}'s avatar`} width={80} height={80} className="w-20 h-20 rounded-full" />
							{/* <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} className="w-20 h-20 rounded-full" /> */}
							<div>
								<h2 className="text-xl font-bold">{username}</h2>
								<p className="text-gray-500">@{userData?.name}</p>
								{
									isBio && <p>{userData.bio}</p>
								}
								<p className="text-gray-500">Created: {formatDate(userData.created_at)}</p>
							</div>
						</div>

						<div className="m-3 grid grid-cols-3 gap-4">
							{
								isShowFollowers && <div className='flex gap-3 items-center bg-lime-200/45 rounded-lg p-3'>
									<FaUserFriends className="text-2xl" />
									<div className="flex-col">
										<p className="font-extrabold text-lg">{userData.followers}</p>
										<p className="text-slate-800">Followers</p>
									</div>
								</div>
							}
							{
								isShowFollowers && <div className='flex gap-3 items-center bg-yellow-200/40 rounded-lg p-3'>
									<FaUserPlus className="text-2xl" />
									<div className="flex-col">
										<p className="font-extrabold text-lg">{userData.following}</p>
										<p className="text-slate-800">Following</p>
									</div>
								</div>
							}
							{
								isShowFollowers && <div className='flex gap-3 items-center bg-purple-500/40 rounded-lg p-3'>
									<FaCodeBranch className="text-2xl" />
									<div className="flex-col">
										<p className="font-extrabold text-lg">{userData.public_repos}</p>
										<p className="text-slate-800">Public Repos</p>
									</div>
								</div>
							}

							{/* <p><strong>Public Gists:</strong> {userData.public_gists}</p> */}
							{/* <div className="col-span-3">
								{
									showContributions && <div className="mt-4">
										<h3 className="text-lg font-bold">Contributions</h3>
										<img src={`${proxyUrl}https://ghchart.rshah.org/${userData.login}`} alt="GitHub Contributions" />
									</div>
								}
							</div> */}
						</div>
						{
							showPRs && (
								<div className="mt-4">
									<h3 className="text-lg font-bold">Pull Requests</h3>
									<ul className="mt-3">
										{prData?.length && prData.map(pr => (
											<li key={pr.id} className="mb-2 flex justify-between">
												<a href={pr.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">
													<span className={`font-bold uppercase mr-3 ${pr.state === 'open' ? 'text-purple-600' : 'text-green-800'}`}>{pr.state}</span>
													{pr.title}
												</a>
												<p className="text-gray-500">
													{formatDate(pr.created_at)}
												</p>
											</li>
										))}
									</ul>
								</div>
							)
						}

					</div>


					<div className="flex gap-4 mt-4 items-center justify-center">
						<a href={userData?.html_url} target="_blank" rel="noopener noreferrer">
							View Profile
						</a>

						<button
							onClick={handleDownloadImage}
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
						>
							Download as Image
						</button>
					</div>
				</div> : <div className="flex-col justify-center items-center">
					<h4 className="font-bold text-center text-2xl mb-6">Github Cards</h4>
					<div className="flex flex-col gap-4">
						<div className="flex items-center">
							<FaGithub className="mr-2" />
							<p>View your contributions in Github</p>
						</div>
						<div className="flex items-center">
							<FaShareAlt className="mr-2" />
							<p>Easily share to your social media</p>
						</div>
					</div>
				</div>
			}
			{/* Download Button */}

		</>
	);
};

export default UserCard;