import { useQuery } from '@tanstack/react-query';
import type { Character } from '../types/character';

const fetchCharacter = async (name: string): Promise<Character> => {
	const response = await fetch(`http://localhost:4000/characters/${encodeURIComponent(name)}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch character: ${name}`);
	}
	return response.json();
};

export const useCharacter = (name: string) => {
	return useQuery({
		queryKey: ['character', name],
		queryFn: () => fetchCharacter(name),
		staleTime: 24 * 60 * 60 * 1000, // 1 day
		gcTime: 25 * 60 * 60 * 1000, // 25 hours (slightly longer than stale time)
		enabled: !!name, // Only run query if name is provided
	});
};
