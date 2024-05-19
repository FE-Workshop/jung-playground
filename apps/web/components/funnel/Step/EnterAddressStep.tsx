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
	onNext: (data: string) => void;
	onPrevious: () => void;
};

const formSchema = z.object({
	address: z.string().min(5, {
		message: 'Please enter at least 5 characters for the address.',
	}),
});

const EnterAddressStep = ({ onNext, onPrevious, registerData }: StepProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			address: registerData.address || '',
		},
		mode: 'onChange',
	});

	const { handleSubmit, formState } = form;
	const { isValid, isSubmitting } = formState;

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		onNext(values.address);
	};

	return (
		<>
			<TypographyH2>Address</TypographyH2>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter the address</FormLabel>
								<FormControl>
									<Input placeholder='address' {...field} />
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

export default EnterAddressStep;
