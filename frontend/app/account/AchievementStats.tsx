interface AchievementStatsProps {
	completed: number;
	inProgress: number;
	notStarted: number;
}

export function AchievementStats({ completed, inProgress, notStarted }: AchievementStatsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
			<div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
				<h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Completed</h3>
				<p className="text-2xl font-bold text-green-600 dark:text-green-400">{completed}</p>
			</div>
			<div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg">
				<h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">In Progress</h3>
				<p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{inProgress}</p>
			</div>
			<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Not Started</h3>
				<p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{notStarted}</p>
			</div>
		</div>
	);
}
