import { AccountHeader } from './AccountHeader';

interface ErrorStateProps {
	error: Error;
}

export function ErrorState({ error }: ErrorStateProps) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
			<div className="container mx-auto px-4 py-8">
				<AccountHeader title="Account Error" />
				<div className="text-center py-12">
					<p className="text-red-600 dark:text-red-400 text-lg">Error loading account data</p>
					<p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{error.message}</p>
				</div>
			</div>
		</div>
	);
}
