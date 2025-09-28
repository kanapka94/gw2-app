interface TabNavigationProps {
	activeTab: 'achievements' | 'bank';
	onTabChange: (tab: 'achievements' | 'bank') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
	return (
		<div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
			<button
				onClick={() => onTabChange('achievements')}
				className={`px-4 py-2 rounded-md font-medium transition-colors ${
					activeTab === 'achievements'
						? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
						: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
				}`}
			>
				Achievements
			</button>
			<button
				onClick={() => onTabChange('bank')}
				className={`px-4 py-2 rounded-md font-medium transition-colors ${
					activeTab === 'bank'
						? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
						: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
				}`}
			>
				Bank Storage
			</button>
		</div>
	);
}
