# 📋 Multi-Step Form Engine

A highly interactive, animated, and responsive multi-step form built with **Next.js 15**, **React Hook Form**, **ShadCN UI**, and **Framer Motion**. This project demonstrates best practices in form validation, state management, and user experience design.

## ✨ Features

- **🚀 Multi-Step Wizard**: Seamlessly navigate through complex forms with a step-by-step interface.
- **🎨 Modern UI/UX**: Built with ShadCN UI components and Tailwind CSS for a premium look and feel.
- **⚡ Framer Motion Animations**: Smooth transitions between steps and dynamic UI elements (e.g., conditional field reveals).
- **📝 Robust Validation**: strict type checking and form validation using `React Hook Form` and `Zod`.
- **💾 Auto-Save Simulation**: Visual feedback for autosaving progress.
- **📱 Responsive Design**: Fully responsive layout that works perfectly on desktop and mobile.
- **🛠 Dynamic Form Fields**: Add or remove fields on the fly (e.g., adding multiple phone numbers).
- **🌚 Conditional Logic**: Smart fields that appear/disappear based on user input (e.g., billing address toggle).

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [FontAwesome](https://fontawesome.com/) & [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: TypeScript

## 🚀 Getting Started

Follow these steps to get the project running locally.

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/multistep-form.git
    cd multistep-form
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the form in action.

## 📂 Project Structure

```bash
├── app/
│   ├── layout.tsx      # Root layout with global styles and fonts
│   ├── page.tsx        # Main form engine logic and step orchestration
│   └── globals.css     # Global CSS and Tailwind directives
├── components/
│   └── ui/             # Reusable ShadCN UI components (Button, Input, Card, etc.)
├── lib/
│   └── utils.ts        # CN utility for class merging
└── public/             # Static assets
```

## 🧩 Key Components

- **`FormEngine` (`app/page.tsx`)**: The core component that handles:
  - Step state management (`currentStep`, `direction`)
  - Form data state (`useForm`)
  - Validation triggers before navigation
  - Animation orchestration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
