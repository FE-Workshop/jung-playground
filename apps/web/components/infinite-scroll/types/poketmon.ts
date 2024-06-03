export type Pocketmon = { name: string; url: string };

export type FetchPocketmonsResult = {
	results: Pocketmon[];
	nextCursor?: number;
};
