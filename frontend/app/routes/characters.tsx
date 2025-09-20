import { Link } from 'react-router';
import type { Route } from './+types/characters';
import type { CharacterSummary } from '../types/character';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Characters - Guild Wars 2 App' },
		{ name: 'description', content: 'View all your Guild Wars 2 characters' },
	];
}

export async function loader({}: Route.LoaderArgs) {
	try {
		const response = await fetch('http://localhost:4000/characters');
		if (!response.ok) {
			throw new Error('Failed to fetch characters');
		}
		const characters = await response.json();
		return { characters };
	} catch (error) {
		throw new Response('Failed to fetch characters', { status: 500 });
	}
}

export default function Characters({ loaderData }: Route.ComponentProps) {
	const { characters } = loaderData;

	const formatPlayTime = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return `${hours}h ${minutes}m`;
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Your Characters</h1>
					<Link
						to="/"
						className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
					>
						Back to Home
					</Link>
				</div>

				{characters.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-600 text-lg">No characters found</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{characters.map((character: CharacterSummary) => (
							<Link
								key={character.name}
								to={`/character/${encodeURIComponent(character.name)}`}
								className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 block"
							>
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-xl font-semibold text-gray-900 truncate">{character.name}</h2>
									<span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
										Level {character.level}
									</span>
								</div>

								<div className="space-y-2">
									<div className="flex items-center">
										<span className="text-sm font-medium text-gray-500 w-20">Profession:</span>
										<span className="text-sm text-gray-900 capitalize">{character.profession}</span>
									</div>

									<div className="flex items-center">
										<span className="text-sm font-medium text-gray-500 w-20">Play Time:</span>
										<span className="text-sm text-gray-900">
											{formatPlayTime(character.time_played)}
										</span>
									</div>

									<div className="flex items-center">
										<span className="text-sm font-medium text-gray-500 w-20">Created:</span>
										<span className="text-sm text-gray-900">
											{new Date(character.created).toLocaleDateString()}
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
