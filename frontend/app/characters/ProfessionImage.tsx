import { useEffect, useState } from 'react';

interface ProfessionImageProps {
	profession: string;
}

export function ProfessionImage({ profession }: ProfessionImageProps) {
	const [icon, setIcon] = useState<string | null>(null);

	useEffect(() => {
		fetchProfessionImage(profession).then((icon) => {
			setIcon(icon);
		});
	}, [profession]);

	if (!icon) {
		return <span className="w-6 h-6 animate-pulse bg-gray-200 rounded-full"></span>;
	}

	return <img src={icon} alt={profession} className="w-6 h-6" />;
}

async function fetchProfessionImage(profession: string) {
	console.log('fetching profession image', profession);
	const response = await fetch(`http://localhost:4000/professions/${profession}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch profession image: ${profession}`);
	}

	const data = await response.json();

	console.log(data);

	return data.icon as string;
}
