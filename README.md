# Multi Step Form 📋✅

**Advanced Multi-Step Form Component for React**

A flexible, reusable multi-step form component with validation, progress tracking, and comprehensive state management for collecting complex user information.

---

## 🌟 Features

- 📋 **Multi-Step Layout** - Break forms into manageable steps
- ✅ **Validation** - Client-side validation per step
- 📊 **Progress Tracking** - Visual progress indicator
- ⬅️➡️ **Navigation** - Next, Previous, Complete actions
- 💾 **State Persistence** - Save progress locally
- 🎨 **Customizable** - Easy theming and styling
- 📱 **Responsive** - Mobile-friendly design
- ✨ **Smooth Animations** - Professional transitions
- 🔒 **Data Safety** - Secure data handling
- 📝 **TypeScript** - Full type safety

---

## 🛠️ Tech Stack

**Frontend:**
- React with TypeScript
- React Hook Form
- Zod/Yup validation
- Tailwind CSS
- Framer Motion

---

## 📊 Language Composition

```
TypeScript: 92.6%
CSS: 5.3%
Shell: 1.5%
JavaScript: 0.6%
```

---

## 🚀 Getting Started

### Installation

```bash
# Via npm
npm install multi-step-form-lib

# Via yarn
yarn add multi-step-form-lib
```

### Basic Usage

```tsx
import { MultiStepForm } from 'multi-step-form-lib';

export default function App() {
  const steps = [
    { id: 1, title: 'Personal Info' },
    { id: 2, title: 'Contact Details' },
    { id: 3, title: 'Confirmation' },
  ];

  const handleComplete = (data) => {
    console.log('Form completed:', data);
  };

  return (
    <MultiStepForm
      steps={steps}
      onComplete={handleComplete}
    >
      {/* Step content */}
    </MultiStepForm>
  );
}
```

---

## 📁 Project Structure

```
multi-step-form/
├── src/
│   ├── components/
│   │   ├── MultiStepForm.tsx     # Main component
│   │   ├── StepContent.tsx       # Step content wrapper
│   │   ├── ProgressBar.tsx       # Progress indicator
│   │   ├── NavigationButtons.tsx # Next/Prev buttons
│   │   ├── StepIndicator.tsx     # Step dots/numbers
│   │   └── FormField.tsx         # Input component
│   ├── hooks/
│   │   ├── useMultiStepForm.ts   # Form logic
│   │   └── useFormValidation.ts  # Validation
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── utils/
│   │   ├── validation.ts         # Validators
│   │   └── storage.ts            # Local storage
│   ├── styles/
│   │   └── globals.css
│   └── index.ts
├── examples/
│   ├── BasicForm.tsx
│   ├── AdvancedForm.tsx
│   └── CustomStyling.tsx
└── package.json
```

---

## 🎯 Basic Example

```tsx
import React, { useState } from 'react';
import { MultiStepForm } from 'multi-step-form-lib';

export default function UserOnboarding() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
  });

  const steps = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Tell us about yourself',
    },
    {
      id: 2,
      title: 'Contact Details',
      description: 'How can we reach you?',
    },
    {
      id: 3,
      title: 'Professional Info',
      description: 'Work details',
    },
  ];

  const handleComplete = (data) => {
    console.log('Onboarding complete:', data);
    // Submit to API
  };

  return (
    <MultiStepForm
      steps={steps}
      onComplete={handleComplete}
      data={formData}
      onChange={setFormData}
    >
      {/* Step 1: Personal Info */}
      <StepContent stepId={1}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
      </StepContent>

      {/* Step 2: Contact */}
      <StepContent stepId={2}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />
      </StepContent>

      {/* Step 3: Professional */}
      <StepContent stepId={3}>
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
        />
        <input
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={(e) =>
            setFormData({ ...formData, designation: e.target.value })
          }
        />
      </StepContent>
    </MultiStepForm>
  );
}
```

---

## 🔍 Advanced Example

```tsx
import { MultiStepForm, useMultiStepForm } from 'multi-step-form-lib';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(2),
  email: z.string().email(),
  // ... more validations
});

export default function AdvancedForm() {
  const { step, nextStep, prevStep, isValid } = useMultiStepForm({
    totalSteps: 3,
    onValidate: async (data) => {
      return await schema.parseAsync(data);
    },
  });

  return (
    <div>
      <ProgressBar currentStep={step} totalSteps={3} />
      
      {step === 1 && <Step1Form />}
      {step === 2 && <Step2Form />}
      {step === 3 && <Step3Confirmation />}

      <div className="mt-6 flex gap-4">
        {step > 1 && (
          <button onClick={prevStep}>Previous</button>
        )}
        {step < 3 && (
          <button
            onClick={nextStep}
            disabled={!isValid}
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button onClick={handleSubmit}>Complete</button>
        )}
      </div>
    </div>
  );
}
```

---

## 📋 Component Props

### MultiStepForm

```tsx
interface MultiStepFormProps {
  steps: Step[];
  onComplete: (data: any) => void;
  onStepChange?: (stepId: number) => void;
  onValidate?: (data: any, stepId: number) => boolean | Promise<boolean>;
  data?: any;
  onChange?: (data: any) => void;
  persistProgress?: boolean;
  children: React.ReactNode;
}
```

### useMultiStepForm Hook

```tsx
const {
  step,
  totalSteps,
  progress,
  isFirstStep,
  isLastStep,
  nextStep,
  prevStep,
  goToStep,
  isValid,
} = useMultiStepForm(options);
```

---

## ✨ Features

### Progress Tracking

```tsx
<ProgressBar
  currentStep={step}
  totalSteps={3}
  showPercentage
  showLabels
/>
```

### Step Indicators

```tsx
<StepIndicator
  steps={[
    { id: 1, label: 'Step 1' },
    { id: 2, label: 'Step 2' },
    { id: 3, label: 'Step 3' },
  ]}
  activeStep={currentStep}
  completedSteps={completedSteps}
/>
```

### Form Validation

```tsx
const validateStep = (data, stepId) => {
  switch (stepId) {
    case 1:
      return data.firstName && data.lastName;
    case 2:
      return data.email && data.phone;
    case 3:
      return data.company;
    default:
      return false;
  }
};
```

### Local Storage Persistence

```tsx
<MultiStepForm
  persistProgress={true}
  persistKey="user-form"
>
  {/* Form content */}
</MultiStepForm>
```

---

## 🎨 Customization

### Custom Styling

```tsx
<MultiStepForm
  className="custom-form"
  stepClassName="custom-step"
  buttonClassName="custom-button"
  progressClassName="custom-progress"
>
  {/* Form content */}
</MultiStepForm>
```

### Custom Animation

```tsx
<MultiStepForm
  animationType="slide"  // 'fade' | 'slide' | 'zoom'
  animationDuration={0.3}
>
  {/* Form content */}
</MultiStepForm>
```

---

## 🔒 Data Persistence

```tsx
// Auto-save to localStorage
<MultiStepForm
  persistProgress={true}
  persistKey="my-form"
  persistInterval={1000}
>
  {/* Form will auto-save every 1 second */}
</MultiStepForm>
```

---

## 🧪 Testing

```bash
npm run test
npm run test:coverage
```

---

## 📚 Resources

- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Email: [saumay.killa@gmail.com](mailto:saumay.killa@gmail.com)

---

## 🔗 Links

- **Live Demo**: [https://saumay-multistep-form.vercel.app/](https://saumay-multistep-form.vercel.app/)
- **GitHub**: [https://github.com/saumaykilla/multistep-form](https://github.com/saumaykilla/multistep-form)

---

<div align="center">

**Complex Forms Made Simple**

Made with ❤️ by Saumay Killa

[⬆ back to top](#multi-step-form-)

</div>
