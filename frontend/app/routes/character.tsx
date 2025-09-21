import { Link } from 'react-router';
import type { Route } from '../character/+types/character';
import type { Character as CharacterType } from '../types/character';

export async function loader({ params }: Route.LoaderArgs) {
	try {
		const response = await fetch(
			`http://localhost:4000/characters/${encodeURIComponent(params.id)}`
		);
		if (!response.ok) {
			throw new Error('Failed to fetch character');
		}
		const character = await response.json();
		return { character };
	} catch (error) {
		throw new Response('Failed to fetch character', { status: 500 });
	}
}

export function Character({ loaderData }: Route.ComponentProps) {
	const { character } = loaderData;

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

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold text-gray-900">{character.name}</h1>
					<Link
						to="/characters"
						className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
					>
						Back to Characters
					</Link>
				</div>

				<div className="bg-white rounded-lg shadow-md p-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Info</h2>

							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Name:</span>
									<span className="text-gray-900">{character.name}</span>
								</div>

								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Profession:</span>
									<span className="text-gray-900 capitalize">{character.profession}</span>
								</div>

								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Level:</span>
									<span className="text-gray-900">{character.level}</span>
								</div>

								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Race:</span>
									<span className="text-gray-900 capitalize">{character.race}</span>
								</div>

								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Gender:</span>
									<span className="text-gray-900 capitalize">{character.gender}</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Stats</h2>

							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Time Played:</span>
									<span className="text-gray-900">{formatPlayTime(character.time_played)}</span>
								</div>

								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Age:</span>
									<span className="text-gray-900">{character.age} years</span>
								</div>

								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Deaths:</span>
									<span className="text-gray-900">{character.deaths}</span>
								</div>

								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Created:</span>
									<span className="text-gray-900">
										{new Date(character.created).toLocaleDateString()}
									</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Crafting</h2>

							<div className="space-y-3">
								{character.craftings.length > 0 ? (
									character.craftings.map((craft: any, index: number) => (
										<div key={index} className="flex justify-between items-center">
											<span className="font-medium text-gray-600 capitalize">
												{craft.discipline}:
											</span>
											<div className="flex items-center space-x-2">
												<span className="text-gray-900">Level {craft.rating}</span>
												{craft.active && (
													<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
														Active
													</span>
												)}
											</div>
										</div>
									))
								) : (
									<p className="text-gray-500">No crafting disciplines</p>
								)}
							</div>
						</div>
					</div>

					{character.guild && (
						<div className="mt-8 pt-8 border-t border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Guild</h2>
							<p className="text-gray-900">{character.guild}</p>
						</div>
					)}

					{character.title && (
						<div className="mt-8 pt-8 border-t border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Title</h2>
							<p className="text-gray-900">Title ID: {character.title}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
