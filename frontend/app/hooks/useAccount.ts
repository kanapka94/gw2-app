import { useQuery } from '@tanstack/react-query';
import type { AccountData } from '../types/account';

const fetchAccountData = async (): Promise<AccountData> => {
	const [achievementsRes, bankRes] = await Promise.all([
		fetch('http://localhost:4000/account/achievements'),
		fetch('http://localhost:4000/account/bank'),
	]);

	if (!achievementsRes.ok || !bankRes.ok) {
		throw new Error('Failed to fetch account data');
	}

	const [achievements, bank] = await Promise.all([achievementsRes.json(), bankRes.json()]);

	return { achievements, bank };
};

export const useAccount = () => {
	return useQuery({
		queryKey: ['account'],
		queryFn: fetchAccountData,
		staleTime: 24 * 60 * 60 * 1000, // 1 day
		gcTime: 25 * 60 * 60 * 1000, // 25 hours (slightly longer than stale time)
	});
};
