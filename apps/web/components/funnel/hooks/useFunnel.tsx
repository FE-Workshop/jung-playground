import { Children, isValidElement, useEffect } from 'react';
import { type ReactNode, useState } from 'react';
import { useQueryParam } from '../../../hooks/useQueryParam';

type StepProps = {
	name: string;
	children: ReactNode;
};

type FunnelProps = {
	children: ReactNode;
};

export const useFunnel = (steps: readonly string[]) => {
	if (steps.length === 0) {
		throw new Error('Steps array cannot be empty');
	}
	const [step, setStep] = useState(steps[0]);

	const { pushRouteWithQuery, paramValue } = useQueryParam('step');

	useEffect(() => {
		paramValue && setStep(paramValue);
	}, [paramValue]);

	const onNext = () => {
		const currentIndex = steps.indexOf(step!);

		if (currentIndex >= 0 && currentIndex < steps.length - 1) {
			const currentStep = steps[currentIndex + 1];
			setStep(currentStep);
			pushRouteWithQuery('step', currentStep || '');
		}
	};

	const onPrevious = () => {
		const currentIndex = steps.indexOf(step!);

		if (currentIndex >= 1 && currentIndex < steps.length - 1) {
			const currentStep = steps[currentIndex - 1];
			setStep(currentStep);
			pushRouteWithQuery('step', currentStep || '');
		}
	};

	const Step = ({ children }: StepProps) => {
		return <>{children}</>;
	};

	const Funnel = ({ children }: FunnelProps) => {
		const targetStep = Children.toArray(children).find((child) => {
			return isValidElement(child) && child.props.name === step;
		});

		return targetStep || null;
	};

	Funnel.Step = Step;

	return { Funnel, onNext, onPrevious, setStep };
};
