import { TypographyH2 } from '@/components/ui/Typography/TypgraphyH2';
import { TypographyH3 } from '@/components/ui/Typography/TypographyH3';
import { Button } from '@/components/ui/button';
import type { Steps } from '../types/steps';

type StepProps = {
	registerData: Steps;
	onNext: () => void;
	onPrevious: () => void;
};

const PreviewStep = ({ onNext, onPrevious, registerData }: StepProps) => {
	return (
		<>
			<TypographyH2>Preview</TypographyH2>
			<div className='space-y-8'>
				<div className='space-y-4'>
					<div>
						<TypographyH3>Lastname</TypographyH3>
						<p>{registerData.name.lastName}</p>
					</div>
					<div>
						<TypographyH3>Firstname</TypographyH3>
						<p>{registerData.name.firstName}</p>
					</div>
				</div>
				<div>
					<TypographyH3>Phonenumber</TypographyH3>
					<p>{registerData.phoneNumber}</p>
				</div>
				<div>
					<TypographyH3>Address</TypographyH3>
					<p>{registerData.address}</p>
				</div>
			</div>
			<div className='space-x-4'>
				<Button type='button' variant='outline' onClick={onPrevious}>
					Previous
				</Button>
				<Button type='submit' variant='default' onClick={onNext}>
					Next
				</Button>
			</div>
		</>
	);
};

export default PreviewStep;
