import { fetchPocketmons } from '@/service/fetchPocketmons';
import {
	type InfiniteData,
	type QueryFunctionContext,
	useInfiniteQuery,
} from '@tanstack/react-query';
import type { FetchPocketmonsResult } from '../../types/poketmon';

export const useGetPoketmon = (
	queryKey: string[],
	initialData?: InfiniteData<FetchPocketmonsResult, unknown>,
) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery<FetchPocketmonsResult, Error>({
			queryKey,
			queryFn: async (context: QueryFunctionContext) => {
				const pageParam = context.pageParam as number | undefined;
				return fetchPocketmons(pageParam);
			},
			initialData,
			initialPageParam: 0,
			getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
		});

	return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading };
};
