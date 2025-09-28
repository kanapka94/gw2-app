import type { Route } from './+types/account';
import { useState } from 'react';
import { useAccount } from '../hooks/useAccount';
import { AccountHeader } from '../account/AccountHeader';
import { TabNavigation } from '../account/TabNavigation';
import { AchievementStats } from '../account/AchievementStats';
import { AchievementList } from '../account/AchievementList';
import { BankStorage } from '../account/BankStorage';
import { LoadingState } from '../account/LoadingState';
import { ErrorState } from '../account/ErrorState';

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

	if (isLoading) {
		return <LoadingState />;
	}

	if (error) {
		return <ErrorState error={error} />;
	}

	const achievements = accountData?.achievements || [];
	const bank = accountData?.bank || [];

	const completedAchievements = achievements.filter((achievement) => achievement.done);
	const inProgressAchievements = achievements.filter(
		(achievement) => !achievement.done && achievement.current > 0
	);
	const notStartedAchievements = achievements.filter(
		(achievement) => !achievement.done && achievement.current === 0
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
			<div className="container mx-auto px-4 py-8">
				<AccountHeader title="Account Details" />

				<TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

				<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
					{activeTab === 'achievements' && (
						<div className="space-y-6">
							<AchievementStats
								completed={completedAchievements.length}
								inProgress={inProgressAchievements.length}
								notStarted={notStartedAchievements.length}
							/>

							<AchievementList achievements={inProgressAchievements} title="In Progress" />
						</div>
					)}

					{activeTab === 'bank' && <BankStorage bank={bank} />}
				</div>
			</div>
		</div>
	);
}
