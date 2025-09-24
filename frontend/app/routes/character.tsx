import { Link, useParams } from 'react-router';
import type { Route } from './+types/character';
import { useCharacter } from '../hooks/useCharacter';

export default function Character() {
	const { name } = useParams();
	const { data: character, isLoading, error } = useCharacter(name || '');

	const formatPlayTime = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const days = Math.floor(hours / 24);
		const remainingHours = hours % 24;

		if (days > 0) {
			return `${days}d ${remainingHours}h ${minutes}m`;
		}
		return `${hours}h ${minutes}m`;
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
				<div className="container mx-auto px-4 py-8">
					<div className="flex items-center justify-between mb-8">
						<div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						<Link
							to="/characters"
							className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
						>
							Back to Characters
						</Link>
					</div>
					<div className="text-center py-12">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
						<p className="text-gray-600 dark:text-gray-400 text-lg mt-4">
							Loading character details...
						</p>
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
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							Character Not Found
						</h1>
						<Link
							to="/characters"
							className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
						>
							Back to Characters
						</Link>
					</div>
					<div className="text-center py-12">
						<p className="text-red-600 dark:text-red-400 text-lg">Error loading character</p>
						<p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{error.message}</p>
					</div>
				</div>
			</div>
		);
	}

	if (!character) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
				<div className="container mx-auto px-4 py-8">
					<div className="flex items-center justify-between mb-8">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							Character Not Found
						</h1>
						<Link
							to="/characters"
							className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
						>
							Back to Characters
						</Link>
					</div>
					<div className="text-center py-12">
						<p className="text-gray-600 dark:text-gray-400 text-lg">Character not found</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
						{character.name}
					</h1>
					<Link
						to="/characters"
						className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
					>
						Back to Characters
					</Link>
				</div>

				<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
								Basic Info
							</h2>

							<div className="space-y-3">
								<div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
									<span className="font-medium text-gray-600 dark:text-gray-300">Name:</span>
									<span className="text-gray-900 dark:text-white font-semibold">
										{character.name}
									</span>
								</div>

								<div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
									<span className="font-medium text-gray-600 dark:text-gray-300">Profession:</span>
									<span className="text-gray-900 dark:text-white capitalize font-semibold">
										{character.profession}
									</span>
								</div>

								<div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
									<span className="font-medium text-gray-600 dark:text-gray-300">Level:</span>
									<span className="text-gray-900 dark:text-white font-semibold">
										{character.level}
									</span>
								</div>

								<div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
									<span className="font-medium text-gray-600 dark:text-gray-300">Race:</span>
									<span className="text-gray-900 dark:text-white capitalize font-semibold">
										{character.race}
									</span>
								</div>

								<div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
									<span className="font-medium text-gray-600 dark:text-gray-300">Gender:</span>
									<span className="text-gray-900 dark:text-white capitalize font-semibold">
										{character.gender}
									</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
								Stats
							</h2>

							<div className="space-y-3">
								<div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
									<span className="font-medium text-gray-600 dark:text-gray-300">Time Played:</span>
									<span className="text-gray-900 dark:text-white font-semibold">
										{formatPlayTime(character.age)}
									</span>
								</div>

								<div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
									<span className="font-medium text-gray-600 dark:text-gray-300">Deaths:</span>
									<span className="text-gray-900 dark:text-white font-semibold">
										{character.deaths}
									</span>
								</div>

								<div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
									<span className="font-medium text-gray-600 dark:text-gray-300">Created:</span>
									<span className="text-gray-900 dark:text-white font-semibold">
										{new Date(character.created).toLocaleDateString()}
									</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
								Crafting
							</h2>

							<div className="space-y-3">
								{character.crafting && character.crafting.length > 0 ? (
									character.crafting.map((craft: any, index: number) => (
										<div
											key={index}
											className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
										>
											<span className="font-medium text-gray-600 dark:text-gray-300 capitalize">
												{craft.discipline}:
											</span>
											<div className="flex items-center space-x-2">
												<span className="text-gray-900 dark:text-white font-semibold">
													Level {craft.rating}
												</span>
												{craft.active && (
													<span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
														Active
													</span>
												)}
											</div>
										</div>
									))
								) : (
									<p className="text-gray-500 dark:text-gray-400 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
										No crafting disciplines
									</p>
								)}
							</div>
						</div>
					</div>

					{character.guild && (
						<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
								Guild
							</h2>
							<p className="text-gray-900 dark:text-white p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 font-semibold">
								{character.guild}
							</p>
						</div>
					)}

					{character.title && (
						<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
								Title
							</h2>
							<p className="text-gray-900 dark:text-white p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 font-semibold">
								Title ID: {character.title}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
