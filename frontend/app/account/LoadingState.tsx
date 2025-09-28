import { AccountHeader } from './AccountHeader';

export function LoadingState() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
			<div className="container mx-auto px-4 py-8">
				<AccountHeader title="Account Details" />
				<div className="text-center py-12">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
					<p className="text-gray-600 dark:text-gray-400 text-lg mt-4">Loading account data...</p>
				</div>
			</div>
		</div>
	);
}
