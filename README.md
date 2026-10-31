# LoundryIn Frontend

A modern web application for **LoundryIn** laundry partners and staff to manage store operations, track incoming and active orders, configure laundry services and pricing, communicate with customers, and monitor store performance metrics.

## Features

- **Authentication & Partner Onboarding**
  - Partner Login (`/login`) and Account Registration (`/register`) with JWT token integration.
  - Multi-step Partner Registration (`/partners/register`):
    1. **Data Usaha** – Business details and store information
    2. **Verifikasi Identitas** – Identity verification and document upload
    3. **Data Layanan** – Initial service offerings and pricing configuration
- **Dashboard (`/`, `/dashboard`)**
  - Operational summary cards (Pending, In Progress, Completed orders, etc.).
  - Interactive order volume chart with period filters (`Weekly`, `Monthly`, `All`).
  - Quick-action Floating Action Button (FAB) for rapid workflows.
- **Order Management (`/orders`, `/orders/create`)**
  - View, filter, and track laundry order statuses across workflow stages.
  - Create new customer laundry orders with service selection and order details.
- **Service Management (`/services`)**
  - Manage available laundry packages, categories, turnaround times, and pricing.
- **Chat & Messaging (`/chat`, `/messages`)**
  - Direct messaging interface to communicate with customers regarding their orders.
- **Notifications (`/notifications`)**
  - Real-time and activity notifications for new orders, status updates, and system alerts.
- **Store & User Profile (`/profile`)**
  - Manage partner account settings and store profile details.

## Tech Stack

- **Framework:** [React 19](https://react.dev/) with [Vite 8](https://vite.dev/)
- **Routing:** [React Router DOM v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) + Custom CSS Design Tokens (`Plus Jakarta Sans` & `Inter`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/) (configured with automatic Bearer JWT interceptor)
- **Backend / Cloud Services:** [Firebase](https://firebase.google.com/) (App & Analytics) + REST API Backend

## Project Structure

```text
laundry-frontend/
├── public/                  # Static assets
├── src/
│   ├── assets/              # SVG illustrations and static media
│   ├── components/
│   │   ├── layout/          # Sidebar, Navbar
│   │   └── ui/              # Logo, StepIndicator, FileDropzone, FloatingAddButton
│   ├── layouts/             # AdminLayout wrapper for dashboard pages
│   ├── pages/
│   │   ├── auth/            # Login & Register pages
│   │   ├── chat/            # Customer chat interface
│   │   ├── dashboard/       # Main analytics & metrics dashboard
│   │   ├── notifications/   # Notification center
│   │   ├── orders/          # Order list & CreateOrder form
│   │   ├── partners/        # Multi-step PartnerRegister flow
│   │   ├── profile/         # Partner profile management
│   │   └── services/        # Laundry services management
│   ├── routes/              # Application routing (AppRoutes)
│   ├── services/            # Axios API instance, Auth service, Firebase init
│   ├── styles/              # CSS variables, component styles, and page styles
│   ├── App.jsx              # Root component
│   └── main.jsx             # Application entry point
├── DESIGN.md                # UI/UX design system and token documentation
├── PRODUCT.md               # Product overview and design principles
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (or compatible package manager)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and configure your backend API URL and Firebase credentials:

```env
# Backend REST API
VITE_API_URL=http://localhost:3000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will start locally (default: `http://localhost:5173`).

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with HMR |
| `npm run build` | Builds the application for production into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint across the codebase |

## Application Routes

| Path | Page / Component | Layout | Description |
| :--- | :--- | :--- | :--- |
| `/login` | `Login` | Public | Partner sign-in page |
| `/register` | `Register` | Public | New account registration |
| `/partners/register` | `PartnerRegister` | Public | 3-step partner onboarding wizard |
| `/` or `/dashboard` | `Dashboard` | `AdminLayout` | Store overview, KPI cards, and order charts |
| `/orders` | `Orders` | `AdminLayout` | Laundry orders list and status management |
| `/orders/create` | `CreateOrder` | `AdminLayout` | Create a new laundry order |
| `/services` | `Services` | `AdminLayout` | Manage laundry service packages and pricing |
| `/chat` or `/messages` | `Chat` | `AdminLayout` | Customer messaging and support chat |
| `/notifications` | `Notifications` | `AdminLayout` | Store and order notifications |
| `/profile` | `Profile` | `AdminLayout` | Partner and store profile settings |

## Design & Product Documentation

For more details on the visual language, typography, color tokens, and product goals, see:
- [PRODUCT.md](./PRODUCT.md) — Product purpose, target users, and design principles.
- [DESIGN.md](./DESIGN.md) — Color tokens, typography scale, and layout specifications.
