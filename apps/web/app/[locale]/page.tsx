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
		<div>
			<Link href={ROUTE.funnel}>
				<Button>Funnel</Button>
			</Link>
		</div>
	);
}
