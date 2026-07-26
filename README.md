# CleanUIPrototype

A modern, responsive, and modular UI prototype built using **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. The project demonstrates a clean and scalable frontend architecture with reusable UI components based on **shadcn/ui**, making it suitable for dashboards, enterprise applications, and AI-driven web platforms.

---

# 📖 Table of Contents

- Project Overview
- Features
- Technology Stack
- Project Structure
- Complete Source Code
- Installation
- Setup and Execution Instructions
- Available Scripts
- Customization
- Future Improvements
- Contributing
- License
- Author

---

# 📌 Project Overview

CleanUIPrototype is a frontend prototype designed to showcase modern UI development practices using reusable components and responsive layouts. It includes multiple dashboard modules, AI-inspired interfaces, analytics pages, and utility components while maintaining a clean codebase and scalable architecture.

---

# ✨ Features

- Modern and responsive user interface
- Built with React + TypeScript
- Fast development using Vite
- Tailwind CSS styling
- Reusable shadcn/ui components
- Modular application architecture
- Dashboard-based layout
- AI-inspired interface modules
- Easy customization and extension
- Responsive across desktop and mobile devices

---

# 🛠 Technology Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| shadcn/ui | UI Components |
| PostCSS | CSS Processing |

---

# 📂 Project Structure

```
CleanUIPrototype/
│
├── Guidelines.md
├── ATTRIBUTIONS.md
├── README.md
├── index.html
├── package.json
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── vite.config.ts
├── default_shadcn_theme.css
│
├── src/
│   │
│   ├── app/
│   │
│   ├── components/
│   │   │
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── use-mobile.ts
│   │   │   └── utils.ts
│   │   │
│   │   ├── ConversationalAI.tsx
│   │   ├── CrimePatterns.tsx
│   │   ├── Dashboard.tsx
│   │   ├── FinancialLinks.tsx
│   │   ├── Forecasting.tsx
│   │   ├── Governance.tsx
│   │   ├── Layout.tsx
│   │   ├── NarrativeDetector.tsx
│   │   ├── NetworkAnalyzer.tsx
│   │   ├── OffenderProfiles.tsx
│   │   └── TimelineReconciler.tsx
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── imports/
│   │   └── pasted_text/
│   │
│   ├── styles/
│   │   ├── fonts.css
│   │   ├── globals.css
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── routes.ts
```

---

# 💻 Complete Source Code

This repository contains the **complete source code** required to develop, modify, and deploy the CleanUIPrototype application.

The repository includes:

- Complete React + TypeScript application
- Modular dashboard components
- AI-related interface modules
- Reusable UI component library
- Responsive layouts
- Tailwind CSS styling
- Routing configuration
- Mock data
- Theme configuration
- Build configuration
- Development configuration
- Vite configuration
- Package configuration
- CSS assets
- Documentation files

No additional source files are required to run the application.

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/harsiithjoshi2007/CleanUIPrototype.git
```

---

## 2. Navigate to the Project

```bash
cd CleanUIPrototype
```

---

## 3. Install Dependencies

Using npm

```bash
npm install
```

or using pnpm

```bash
pnpm install
```

---

# ▶️ Setup and Execution Instructions

## Start Development Server

Using npm

```bash
npm run dev
```

Using pnpm

```bash
pnpm dev
```

The application will start on

```
http://localhost:5173
```

---

## Build for Production

Using npm

```bash
npm run build
```

Using pnpm

```bash
pnpm build
```

This generates an optimized production build inside the **dist/** directory.

---

## Preview Production Build

Using npm

```bash
npm run preview
```

Using pnpm

```bash
pnpm preview
```

---

# 📜 Available Scripts

| Command | Description |
|----------|-------------|
| npm install | Install dependencies |
| npm run dev | Start development server |
| npm run build | Build production files |
| npm run preview | Preview production build |
| pnpm install | Install dependencies with pnpm |
| pnpm dev | Start development server |
| pnpm build | Build application |
| pnpm preview | Preview build |

---

# 🎨 Key Components

The application contains multiple reusable modules including:

- Dashboard
- Conversational AI
- Crime Pattern Analysis
- Forecasting
- Governance
- Financial Links
- Network Analyzer
- Narrative Detector
- Timeline Reconciler
- Offender Profiles

These modules demonstrate modular UI development and reusable application architecture.

---

# 🧩 Reusable UI Library

The project includes over **45 reusable UI components**, such as:

- Buttons
- Cards
- Forms
- Dialogs
- Tables
- Charts
- Calendar
- Sidebar
- Navigation Menu
- Dropdown Menu
- Accordion
- Tooltip
- Drawer
- Sheet
- Select
- Tabs
- Toggle
- Avatar
- Badge
- Breadcrumb
- Checkbox
- Slider
- Scroll Area
- Progress Bar
- Popover
- Pagination
- Radio Group
- Skeleton Loader
- Text Area
- Switch
- Carousel

These components promote consistency and improve development efficiency.

---

# 🎯 Customization

You can easily extend the project by:

- Adding new dashboard pages
- Creating new reusable UI components
- Connecting backend APIs
- Replacing mock data with real data
- Integrating authentication
- Adding state management (Redux/Zustand)
- Adding charts and analytics
- Supporting dark mode
- Implementing responsive improvements

---

# 📄 Documentation

This repository includes:

- ✅ Complete Source Code
- ✅ Proper README Documentation
- ✅ Setup Instructions
- ✅ Execution Instructions
- ✅ Folder Structure
- ✅ Installation Guide
- ✅ Build Guide
- ✅ Project Overview
- ✅ Component Overview

---

# 🚀 Future Improvements

Potential enhancements include:

- Backend integration
- User authentication
- Database connectivity
- API integration
- Role-based access control
- Unit testing
- End-to-end testing
- Performance optimization
- CI/CD pipeline
- Docker support

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📄 License

This project is intended for educational and development purposes. You are free to use, modify, and extend the source code in accordance with the applicable license.

---

# 👨‍💻 Author

**Harsiith Joshi B**

GitHub: https://github.com/harsiithjoshi2007

---

## ✅ Repository Checklist

- ✔ Complete Source Code Included
- ✔ Proper README Documentation
- ✔ Setup Instructions
- ✔ Execution Instructions
- ✔ Folder Structure
- ✔ Installation Guide
- ✔ Build Instructions
- ✔ Project Components
- ✔ Technologies Used
- ✔ Contribution Guidelines
- ✔ License Information
