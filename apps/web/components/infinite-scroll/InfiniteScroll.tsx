'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '../ui/card';

import { queryKeys } from '@/state/keys/queryKeys';
import { useVirtualizer } from '@tanstack/react-virtual';
import Image from 'next/image';
import { TypographyH3 } from '../ui/Typography/TypographyH3';
import { useGetPoketmon } from './state/queries/useGetPoketmon';
import type { FetchPocketmonsResult } from './types/poketmon';

type Props = {
	initialData: FetchPocketmonsResult;
};

export const InfiniteScroll = ({ initialData }: Props) => {
	const initialInfiniteData = {
		pages: [initialData],
		pageParams: [0], // 첫 번째 페이지 파라미터를 설정합니다.
	};
	const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
		useGetPoketmon(queryKeys.poketmons(), initialInfiniteData);

	const allRows = data ? data.pages.flatMap((d) => d.results) : [];

	const parentRef = useRef<HTMLDivElement>(null);
	const loaderRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: hasNextPage ? allRows.length + 1 : allRows?.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 158,
		overscan: 10,
	});

	useEffect(() => {
		if (!loaderRef.current) return;

		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 1.0,
			},
		);

		intersectionObserver.observe(loaderRef.current);

		return () => {
			if (loaderRef.current) {
				intersectionObserver.unobserve(loaderRef.current);
			}
		};
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div ref={parentRef} className='h-full min-w-[500px] '>
					<div
						style={{
							height: `${rowVirtualizer.getTotalSize()}px`,
							width: '100%',
							position: 'relative',
						}}
					>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							const pocketmon = allRows[virtualRow.index];
							const isLoaderRow = virtualRow.index >= allRows.length;

							return (
								<div
									key={virtualRow.index}
									style={{
										textAlign: 'center',
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										transform: `translateY(${virtualRow.start}px)`,
									}}
								>
									{!isLoaderRow && (
										<Card
											style={{
												height: `${virtualRow.size - 10}px`,
											}}
										>
											<CardContent className='flex items-center justify-between'>
												<TypographyH3>{pocketmon?.name}</TypographyH3>
												<Image
													src={pocketmon?.url || ''}
													alt={'poketmon'}
													width={100}
													height={100}
												/>
											</CardContent>
										</Card>
									)}
								</div>
							);
						})}
					</div>
				</div>
			)}
			{hasNextPage && (
				<div ref={loaderRef} style={{ textAlign: 'center' }}>
					Loading more...
				</div>
			)}
		</div>
	);
};
