import { Button } from '@/components/ui/button';
import { ROUTE } from '@/constants/route';
import Link from 'next/link';

type Params = {
	params: {
		locale: string;
	};
};

export default async function Home({ params: { locale } }: Params) {
	return (
		<div className='flex gap-x-4'>
			<Link href={ROUTE.funnel}>
				<Button>Funnel</Button>
			</Link>
			<Link href={ROUTE.infinite}>
				<Button>Infinite Scroll</Button>
			</Link>
		</div>
	);
}
