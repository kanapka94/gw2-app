import type { Achievement } from '../types/account';

interface AchievementListProps {
	achievements: Achievement[];
	title: string;
}

const LIMIT = 15;

export function AchievementList({ achievements, title }: AchievementListProps) {
	if (achievements.length === 0) {
		return null;
	}

	return (
		<div>
			<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{achievements.slice(0, LIMIT).map((achievement) => (
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
	);
}
