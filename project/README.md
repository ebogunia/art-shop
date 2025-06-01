# Art Print Shop

A full-stack e-commerce application for selling art prints, built with React.js, Node.js/Express, and PostgreSQL with PayPal integration.

## Features

- Gallery-style browse page for art prints with filtering options
- Detailed product pages with sizing options
- Shopping cart with persistent storage
- Secure checkout with PayPal integration
- User authentication and account management
- Admin dashboard for inventory and order management
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Zustand for state management
- Lucide React for icons

### Backend
- Node.js with Express
- PostgreSQL database
- JWT for authentication
- PayPal integration for payments

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd art-print-shop
```

2. Install dependencies:
```
npm install
```

3. Set up your PostgreSQL database:
- Create a new database called `art_prints`
- Run the SQL commands in `server/db-schema.sql` to set up the tables

4. Configure environment variables:
- Copy `.env.example` to `.env`
- Update with your database connection string and other required variables

5. Start the development server:
```
npm run dev:full
```

This will start both the frontend and backend servers concurrently.

## Project Structure

```
art-print-shop/
├── src/                  # Frontend code
│   ├── components/       # Reusable React components
│   ├── pages/            # Page components
│   ├── stores/           # State management with Zustand
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main React component
│   └── main.tsx          # Entry point
├── server/               # Backend code
│   ├── index.js          # Express server
│   └── db-schema.sql     # Database schema
├── public/               # Static assets
└── package.json          # Project dependencies and scripts
```

## Development

- `npm run dev` - Start the frontend development server
- `npm run server` - Start the backend server
- `npm run dev:full` - Start both frontend and backend servers
- `npm run build` - Build the frontend for production

## Deployment

The application can be deployed to any hosting service that supports Node.js applications. The frontend build output will be in the `dist` directory.

## License

This project is licensed under the MIT License.