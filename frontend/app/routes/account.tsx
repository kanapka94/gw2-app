import { Link } from 'react-router';
import type { Route } from './+types/account';
import { useState } from 'react';
import { useAccount } from '../hooks/useAccount';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Account Details - Guild Wars 2 App' },
		{
			name: 'description',
			content: 'View your Guild Wars 2 account achievements and bank storage',
		},
	];
}

export default function Account() {
	const { data: accountData, isLoading, error } = useAccount();
	const [activeTab, setActiveTab] = useState<'achievements' | 'bank'>('achievements');

	const achievements = accountData?.achievements || [];
	const bank = accountData?.bank || [];

	const completedAchievements = achievements.filter((achievement) => achievement.done);
	const inProgressAchievements = achievements.filter(
		(achievement) => !achievement.done && achievement.current > 0
	);
	const notStartedAchievements = achievements.filter(
		(achievement) => !achievement.done && achievement.current === 0
	);

	const bankSlots = Array.from({ length: 30 }, (_, index) => bank[index] || null);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
				<div className="container mx-auto px-4 py-8">
					<div className="flex items-center justify-between mb-8">
						<div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						<Link
							to="/"
							className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
						>
							Back to Home
						</Link>
					</div>
					<div className="text-center py-12">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
						<p className="text-gray-600 dark:text-gray-400 text-lg mt-4">Loading account data...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
				<div className="container mx-auto px-4 py-8">
					<div className="flex items-center justify-between mb-8">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Error</h1>
						<Link
							to="/"
							className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
						>
							Back to Home
						</Link>
					</div>
					<div className="text-center py-12">
						<p className="text-red-600 dark:text-red-400 text-lg">Error loading account data</p>
						<p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{error.message}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
						Account Details
					</h1>
					<Link
						to="/"
						className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
					>
						Back to Home
					</Link>
				</div>

				{/* Tab Navigation */}
				<div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
					<button
						onClick={() => setActiveTab('achievements')}
						className={`px-4 py-2 rounded-md font-medium transition-colors ${
							activeTab === 'achievements'
								? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
								: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
						}`}
					>
						Achievements
					</button>
					<button
						onClick={() => setActiveTab('bank')}
						className={`px-4 py-2 rounded-md font-medium transition-colors ${
							activeTab === 'bank'
								? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
								: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
						}`}
					>
						Bank Storage
					</button>
				</div>

				<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
					{activeTab === 'achievements' && (
						<div className="space-y-6">
							{/* Achievement Statistics */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
								<div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
									<h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
										Completed
									</h3>
									<p className="text-2xl font-bold text-green-600 dark:text-green-400">
										{completedAchievements.length}
									</p>
								</div>
								<div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg">
									<h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
										In Progress
									</h3>
									<p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
										{inProgressAchievements.length}
									</p>
								</div>
								<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
									<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
										Not Started
									</h3>
									<p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
										{notStartedAchievements.length}
									</p>
								</div>
							</div>

							{/* In Progress Achievements */}
							{inProgressAchievements.length > 0 && (
								<div>
									<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
										In Progress
									</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{inProgressAchievements.slice(0, 12).map((achievement) => (
											<div
												key={achievement.id}
												className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800"
											>
												<div className="flex justify-between items-center mb-2">
													<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
														ID: {achievement.id}
													</span>
													<span className="text-sm text-yellow-600 dark:text-yellow-400">
														{achievement.current}/{achievement.max}
													</span>
												</div>
												<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
													<div
														className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
														style={{ width: `${(achievement.current / achievement.max) * 100}%` }}
													></div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					)}

					{activeTab === 'bank' && (
						<div>
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
								Bank Storage
							</h2>
							<div className="grid grid-cols-5 md:grid-cols-10 gap-2">
								{bankSlots.map((item, index) => (
									<div
										key={index}
										className={`aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-xs font-medium ${
											item
												? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
												: 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600'
										}`}
									>
										{item ? (
											<div className="text-center">
												<div className="text-lg">📦</div>
												<div className="text-xs">{item.count}</div>
											</div>
										) : (
											<span>{index + 1}</span>
										)}
									</div>
								))}
							</div>
							<div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
								<p>Total items: {bank.filter((item) => item !== null).length} / 30 slots</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
