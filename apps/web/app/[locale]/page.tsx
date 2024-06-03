import { ROUTE } from '@/constants/route';
import Link from 'next/link';

type Params = {
	params: {
		locale: string;
	};
};

export default async function Home({ params: { locale } }: Params) {
	return (
		<div>
			<h1>Home</h1>
			<Link href={ROUTE.funnel}>Funnel</Link>
		</div>
	);
}
