import { InfiniteScroll } from '@/components/infinite-scroll/InfiniteScroll';
import { fetchPocketmons } from '@/service/fetchPocketmons';

export default async function InfiniteScrollPage() {
	const initialData = await fetchPocketmons(0); // 첫 번째 페이지의 데이터를 페칭합니다.

	return <InfiniteScroll initialData={initialData} />;
}
