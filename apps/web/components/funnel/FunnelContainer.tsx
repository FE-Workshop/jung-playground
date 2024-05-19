'use client';

import { useCallback, useState } from 'react';

import { STEPS } from '../../constants/steps';
import DoneStep from './Step/DoneStep';
import EnterAddressStep from './Step/EnterAddressStep';
import EnterNameStep from './Step/EnterNameStep';
import EnterPhoneNumberStep from './Step/EnterPhoneNumberStep';
import PreviewStep from './Step/PreviewStep';
import RegisterStep from './Step/RegisterStep';
import { useFunnel } from './hooks/useFunnel';
import type { Steps } from './types/steps';

export const FunnelContainer = () => {
	const [registerData, setRegisterData] = useState<Steps>({
		name: { lastName: '', firstName: '' },
		phoneNumber: '',
		address: '',
	});

	const { Funnel, onNext, onPrevious } = useFunnel(STEPS);

	const handleNext = useCallback(
		(data: Partial<Steps>) => {
			setRegisterData((prev) => ({ ...prev, ...data }));
			onNext();
		},
		[onNext],
	);

	return (
		<Funnel>
			<Funnel.Step name='register'>
				<RegisterStep onNext={onNext} />
			</Funnel.Step>
			<Funnel.Step name='name'>
				<EnterNameStep
					registerData={registerData}
					onNext={(data) => handleNext({ name: data })}
					onPrevious={onPrevious}
				/>
			</Funnel.Step>
			<Funnel.Step name='phoneNumber'>
				<EnterPhoneNumberStep
					registerData={registerData}
					onNext={(data) => handleNext({ phoneNumber: data })}
					onPrevious={onPrevious}
				/>
			</Funnel.Step>
			<Funnel.Step name='address'>
				<EnterAddressStep
					registerData={registerData}
					onNext={(data) => handleNext({ address: data })}
					onPrevious={onPrevious}
				/>
			</Funnel.Step>
			<Funnel.Step name='preview'>
				<PreviewStep
					registerData={registerData}
					onNext={onNext}
					onPrevious={onPrevious}
				/>
			</Funnel.Step>
			<Funnel.Step name='done'>
				<DoneStep />
			</Funnel.Step>
		</Funnel>
	);
};
