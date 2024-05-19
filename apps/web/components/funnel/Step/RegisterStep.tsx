import { TypographyH2 } from '@/components/ui/Typography/TypgraphyH2';
import { Button } from '@/components/ui/button';
import { useQueryParam } from '../../../hooks/useQueryParam';

const RegisterStep = ({ onNext }: { onNext: () => void }) => {
	const { paramValue } = useQueryParam('step');

	if (paramValue !== 'register') {
		return null;
	}
	return (
		<>
			<TypographyH2>Register</TypographyH2>
			<Button variant='default' onClick={onNext}>
				Sign Up
			</Button>
		</>
	);
};

export default RegisterStep;
