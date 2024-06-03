'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { TypographyH2 } from '@/components/ui/Typography/TypgraphyH2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Steps } from '../types/steps';

type StepProps = {
	registerData: Steps;
	onNext: (data: { lastName: string; firstName: string }) => void;
	onPrevious: () => void;
};

const formSchema = z.object({
	lastName: z.string().min(1, {
		message: 'Please enter the lastname.',
	}),
	firstName: z.string().min(1, {
		message: 'Please enter the firstname.',
	}),
});

const EnterNameStep = ({ onNext, onPrevious, registerData }: StepProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			lastName: registerData.name.lastName || '',
			firstName: registerData.name.firstName || '',
		},
		mode: 'onChange',
	});

	const { handleSubmit, formState } = form;
	const { isValid, isSubmitting } = formState;

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		onNext(values);
	};

	return (
		<>
			<TypographyH2>Name</TypographyH2>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter the lastname</FormLabel>
								<FormControl>
									<Input placeholder='lastname' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter the firstname</FormLabel>
								<FormControl>
									<Input placeholder='firstname' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='space-x-4'>
						<Button type='button' variant='outline' onClick={onPrevious}>
							Previous
						</Button>
						<Button
							type='submit'
							variant='default'
							disabled={!isValid || isSubmitting}
						>
							Next
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default EnterNameStep;
