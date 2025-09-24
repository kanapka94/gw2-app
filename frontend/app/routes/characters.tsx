import { Link } from 'react-router';
import type { Route } from './+types/characters';
import { useCharacters } from '../hooks/useCharacters';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Characters - Guild Wars 2 App' },
		{ name: 'description', content: 'View all your Guild Wars 2 characters' },
	];
}

export default function Characters() {
	const { data: characters, isLoading, error } = useCharacters();

	// Generate gradient background based on character name length
	const getGradientBackground = (name: string) => {
		const length = name.length;
		const gradients = [
			'from-purple-400 via-pink-500 to-red-500', // 1-5 letters
			'from-blue-400 via-purple-500 to-pink-500', // 6-10 letters
			'from-green-400 via-blue-500 to-purple-500', // 11-15 letters
			'from-yellow-400 via-orange-500 to-red-500', // 16-20 letters
			'from-indigo-400 via-purple-500 to-pink-500', // 21+ letters
		];

		if (length <= 5) return gradients[0];
		if (length <= 10) return gradients[1];
		if (length <= 15) return gradients[2];
		if (length <= 20) return gradients[3];
		return gradients[4];
	};

	return (
		<div className="min-h-screen bg-white dark:bg-gray-950">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Characters</h1>
					<Link
						to="/"
						className="px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
					>
						Back to Home
					</Link>
				</div>

				{isLoading ? (
					<div className="text-center py-12">
						<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
						<p className="text-gray-600 dark:text-gray-400 text-lg mt-4">Loading characters...</p>
					</div>
				) : error ? (
					<div className="text-center py-12">
						<p className="text-red-600 dark:text-red-400 text-lg">Error loading characters</p>
						<p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{error.message}</p>
					</div>
				) : !characters || characters.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-600 dark:text-gray-400 text-lg">No characters found</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{characters.map((character) => (
							<Link
								key={character}
								to={`/character/${encodeURIComponent(character)}`}
								className={`h-64 bg-gradient-to-br ${getGradientBackground(character)} rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group`}
							>
								<h2 className="text-2xl font-bold text-white text-center px-4 group-hover:text-gray-100 transition-colors duration-300">
									{character}
								</h2>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
