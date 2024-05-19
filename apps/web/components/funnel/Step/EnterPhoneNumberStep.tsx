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
	phoneNumber: z
		.string()
		.regex(/^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/, {
			message: 'Please enter a valid UK phone number.',
		}),
});

const EnterPhoneNumberStep = ({
	onNext,
	onPrevious,
	registerData,
}: StepProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phoneNumber: registerData.phoneNumber || '',
		},
		mode: 'onChange',
	});

	const { handleSubmit, formState } = form;
	const { isValid, isSubmitting } = formState;

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		onNext(values.phoneNumber);
	};

	return (
		<>
			<TypographyH2>PhoneNumber</TypographyH2>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='phoneNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter the valid UK phone number</FormLabel>
								<FormControl>
									<Input placeholder='phoneNumber' {...field} />
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

export default EnterPhoneNumberStep;
