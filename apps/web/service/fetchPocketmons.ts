import type { FetchPocketmonsResult } from '@/components/infinite-scroll/types/poketmon';

export const fetchPocketmons = async (
	pageParam = 0,
): Promise<FetchPocketmonsResult> => {
	const limit = 10;
	const offset = pageParam > 0 ? (pageParam - 1) * limit : 0;
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
	);
	const data = await response.json();
	const results = data.results.map(
		(pocketmon: { url: string; name: string }) => {
			const id = pocketmon.url.split('/').filter(Boolean).pop();
			return {
				name: pocketmon.name,
				url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
			};
		},
	);
	return {
		results,
		nextCursor: pageParam + 1,
	};
};
