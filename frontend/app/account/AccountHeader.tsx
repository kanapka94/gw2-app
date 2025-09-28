import { Link } from 'react-router';

interface AccountHeaderProps {
	title: string;
	showBackButton?: boolean;
}

export function AccountHeader({ title, showBackButton = true }: AccountHeaderProps) {
	return (
		<div className="flex items-center justify-between mb-8">
			<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
				{title}
			</h1>
			{showBackButton && (
				<Link
					to="/"
					className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
				>
					Back to Home
				</Link>
			)}
		</div>
	);
}
