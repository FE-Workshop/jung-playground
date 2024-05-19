// import type { STEPS } from '@/constants/steps';

// export type Step = (typeof STEPS)[number];
// export type ExcludeStep = Exclude<Step, 'register' | 'preview' | 'done'>;
// // export type Steps = Record<ExcludeStep, string>;

export type Steps = {
	name: {
		lastName: string;
		firstName: string;
	};
	phoneNumber: string;
	address: string;
};
