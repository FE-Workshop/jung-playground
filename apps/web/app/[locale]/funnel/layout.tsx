export default function FunnelLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className='flex flex-col space-y-8 items-center justify-center max-w-[375px] bg-gray-100  mx-auto min-h-dvh'>
			{children}
		</section>
	);
}
