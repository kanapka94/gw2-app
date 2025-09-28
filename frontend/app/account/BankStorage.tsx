import type { BankItem } from '../types/account';

interface BankStorageProps {
	bank: BankItem[];
}

export function BankStorage({ bank }: BankStorageProps) {
	const bankSlots = Array.from({ length: 30 }, (_, index) => bank[index] || null);

	return (
		<div>
			<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Bank Storage</h2>
			<div className="grid grid-cols-5 md:grid-cols-10 gap-2">
				{bankSlots.map((item, index) => (
					<div
						key={index}
						className={`aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-xs font-medium ${
							item
								? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
								: 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600'
						}`}
					>
						{item ? (
							<div className="text-center">
								<div className="text-lg">📦</div>
								<div className="text-xs">{item.count}</div>
							</div>
						) : (
							<span>{index + 1}</span>
						)}
					</div>
				))}
			</div>
			<div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
				<p>Total items: {bank.filter((item) => item !== null).length} / 30 slots</p>
			</div>
		</div>
	);
}
