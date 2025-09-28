import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Guild Wars 2 App' },
		{ name: 'description', content: 'Manage your Guild Wars 2 characters and favorites' },
	];
}

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold light:text-gray-900 mb-4">Guild Wars 2 App</h1>
					<p className="text-lg light:text-gray-600 mb-8">Manage your characters and favorites</p>

					<div className="flex justify-center space-x-4 flex-wrap gap-4">
						<Link
							to="/characters"
							className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
						>
							View Characters
						</Link>
						<Link
							to="/account"
							className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
						>
							Account Details
						</Link>
						<Link
							to="/favorites"
							className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
						>
							View Favorites
						</Link>
					</div>
				</div>

				<Welcome />
			</div>
		</div>
	);
}
