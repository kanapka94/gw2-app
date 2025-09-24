import { useQuery } from '@tanstack/react-query';
import type { CharactersResponse } from '../types/character';

const fetchCharacters = async (): Promise<CharactersResponse> => {
	const response = await fetch('http://localhost:4000/characters');
	if (!response.ok) {
		throw new Error('Failed to fetch characters');
	}
	return response.json();
};

export const useCharacters = () => {
	return useQuery({
		queryKey: ['characters'],
		queryFn: fetchCharacters,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};
