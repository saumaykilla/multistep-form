// shadcn v4 components, tailwind classes, framer motion, react-hook-form, font awesome icons
  "use client"
import { useState, useEffect, MouseEvent } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Switch } from '../components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

// --- DUMMY DATA AND CONFIGURATION ---
const formSteps = [
  {
    step: 1,
    title: 'Personal Information',
    description: 'Please provide your name and contact details.',
    fields: ['firstName', 'lastName', 'email', 'phones']
  },
  {
    step: 2,
    title: 'Shipping Details',
    description: 'Where should we send your order?',
    fields: ['address', 'city', 'country', 'useDifferentBillingAddress']
  },
  {
    step: 3,
    title: 'Preferences',
    description: 'Help us customize your experience.',
    fields: ['accountType', 'enableNotifications', 'communicationMethod']
  },
  {
    step: 4,
    title: 'Review & Submit',
    description: 'Please review your details before submitting.',
    fields: []
  }
];

const FormEngine = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [autosaveStatus, setAutosaveStatus] = useState('Saved ✓');
  const [direction, setDirection] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phones: [{ number: '' }],
      address: '',
      city: '',
      country: '',
      useDifferentBillingAddress: false,
      billingAddress: '',
      accountType: 'personal',
      enableNotifications: true,
      communicationMethod: 'email',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones"
  });

  const useDifferentBillingAddress = watch('useDifferentBillingAddress');
  const allFields = watch();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        setAutosaveStatus('Saving...');
        const timer = setTimeout(() => {
          setAutosaveStatus('Saved ✓');
        }, 1500);
        return () => clearTimeout(timer);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);


  const handleNext = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fields = formSteps[currentStep].fields;
    // @ts-ignore
    const output = await trigger(fields, { shouldFocus: true });
    if (!output) return;

    if (currentStep < formSteps.length - 1) {
      setDirection(1);
      setCurrentStep(step => step + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(step => step - 1);
    }
  };

  const goToStep = async (stepIndex: number) => {
    if (stepIndex > currentStep) {
      const stepsToValidate = formSteps.slice(currentStep, stepIndex);
      for (const step of stepsToValidate) {
        // @ts-ignore
        const output = await trigger(step.fields);
        if (!output) {
          setCurrentStep(formSteps.indexOf(step));
          return;
        }
      }
    }
    setDirection(stepIndex > currentStep ? 1 : -1);
    setCurrentStep(stepIndex);
  };


  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data);
    alert('Form submitted successfully! Check the console for data.');
  };
  
  const stepVariants: Variants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction > 0 ? '100%' : '-100%',
    }),
    visible: {
      opacity: 1,
      x: '0%',
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction < 0 ? '100%' : '-100%',
      transition: { duration: 0.4, ease: 'easeInOut' },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1704022810195-de7199db478c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGZvcm0lMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE3NjU1NTY1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080')"}}>
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center text-gray-800">Account Creation</h1>
          <div className="mt-4">
             <TooltipProvider>
                <div className="flex justify-between items-center">
                    {formSteps.map((step, index) => (
                         <div key={index} className="flex-1 flex items-center">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button onClick={() => goToStep(index)} className="flex flex-col items-center cursor-pointer">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= index ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-500'}`}>
                                            {currentStep > index ? <i className="fas fa-check"></i> : step.step}
                                        </div>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{step.title}</p>
                                </TooltipContent>
                            </Tooltip>
                            {index < formSteps.length - 1 && (
                                <div className={`flex-1 h-1 mx-2 transition-colors duration-500 ${currentStep > index ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </TooltipProvider>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="overflow-hidden relative min-h-[450px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">{formSteps[currentStep].title}</h2>
                    <p className="text-gray-500 mt-1">{formSteps[currentStep].description}</p>
                </div>
                
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" {...register('firstName', { required: 'First name is required' })} className={errors.firstName ? 'border-red-500' : ''} />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" {...register('lastName', { required: 'Last name is required' })} className={errors.lastName ? 'border-red-500' : ''} />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                      </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className={errors.email ? 'border-red-500' : ''} />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                     </div>
                     <div className="space-y-4">
                        <Label>Phone Numbers</Label>
                        {fields.map((field, index) => (
                           <div key={field.id} className="flex items-center gap-2">
                               <Input {...register(`phones.${index}.number`, { required: 'Phone number is required' })} placeholder="e.g., +1 555-1234" className={errors.phones?.[index]?.number ? 'border-red-500' : ''} />
                               <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                                  <i className="fas fa-trash-alt"></i>
                               </Button>
                           </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => append({ number: '' })}>
                           <i className="fas fa-plus mr-2"></i> Add Phone
                        </Button>
                     </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St" {...register('address', { required: 'Address is required' })} className={errors.address ? 'border-red-500' : ''} />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Anytown" {...register('city', { required: 'City is required' })} className={errors.city ? 'border-red-500' : ''} />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Controller
                            name="country"
                            control={control}
                            rules={{ required: 'Please select a country' }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USA">United States</SelectItem>
                                        <SelectItem value="Canada">Canada</SelectItem>
                                        <SelectItem value="Mexico">Mexico</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                    </div>
                     <div className="flex items-center space-x-2">
                        <Controller
                            name="useDifferentBillingAddress"
                            control={control}
                            render={({ field }) => (
                                <Checkbox id="useDifferentBillingAddress" checked={field.value} onCheckedChange={field.onChange} />
                            )}
                        />
                        <Label htmlFor="useDifferentBillingAddress">Use a different billing address</Label>
                    </div>
                    {useDifferentBillingAddress && (
                         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 border-l-4 border-blue-500 pl-4">
                            <Label htmlFor="billingAddress">Billing Address</Label>
                            <Input id="billingAddress" placeholder="456 Billing Ave" {...register('billingAddress', { required: 'Billing address is required' })} className={errors.billingAddress ? 'border-red-500' : ''} />
                            {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress.message}</p>}
                        </motion.div>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <Label>Account Type</Label>
                             <Controller
                                name="accountType"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="personal" id="personal" />
                                            <Label htmlFor="personal">Personal</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="business" id="business" />
                                            <Label htmlFor="business">Business</Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <Label htmlFor="enableNotifications" className="flex flex-col">
                                <span>Enable Notifications</span>
                                <span className="text-sm text-gray-500">Receive updates about your account.</span>
                            </Label>
                             <Controller
                                name="enableNotifications"
                                control={control}
                                render={({ field }) => (
                                    <Switch id="enableNotifications" checked={field.value} onCheckedChange={field.onChange} />
                                )}
                            />
                        </div>
                         <div className="space-y-3">
                            <Label>Preferred Communication Method</Label>
                            <Controller
                                name="communicationMethod"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                         <Button type="button" variant={field.value === 'email' ? 'default' : 'outline'} onClick={() => field.onChange('email')}>
                                            <i className="fas fa-envelope mr-2"></i>Email
                                         </Button>
                                         <Button type="button" variant={field.value === 'sms' ? 'default' : 'outline'} onClick={() => field.onChange('sms')}>
                                            <i className="fas fa-comment-alt mr-2"></i>SMS
                                         </Button>
                                         <Button type="button" variant={field.value === 'phone' ? 'default' : 'outline'} onClick={() => field.onChange('phone')}>
                                            <i className="fas fa-phone mr-2"></i>Phone Call
                                         </Button>
                                    </RadioGroup>
                                )}
                             />
                        </div>
                    </div>
                )}
                
                {currentStep === 3 && (
                   <div className="space-y-4">
                       <h3 className="font-semibold text-lg">Review Your Information</h3>
                       <div className="p-4 bg-gray-50 rounded-lg border space-y-2">
                            <p><strong>Full Name:</strong> {allFields.firstName} {allFields.lastName}</p>
                            <p><strong>Email:</strong> {allFields.email}</p>
                            <p><strong>Address:</strong> {allFields.address}, {allFields.city}</p>
                            <p><strong>Country:</strong> {allFields.country}</p>
                            <p><strong>Account Type:</strong> <span className="capitalize">{allFields.accountType}</span></p>
                       </div>
                       <p className="text-sm text-gray-600">By clicking submit, you agree to our Terms of Service.</p>
                   </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between items-center border-t pt-6">
            <div className="text-sm text-gray-500">
              <span>{autosaveStatus}</span>
            </div>
            <div className="flex gap-4">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              {currentStep < formSteps.length - 1 ? (
                <Button key="next" type="button" onClick={handleNext}>
                  Next Step <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              ) : (
                <Button key="submit" type="submit" onClick={handleSubmit(onSubmit)}>
                  Submit <i className="fas fa-paper-plane ml-2"></i>
                </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default FormEngine;