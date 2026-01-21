# Amazon Website Clone

A full recreation of the Amazon website with a modern tech stack.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Authentication**: JWT with HTTP-only cookies

## Features

- Complete Amazon homepage recreation
- User authentication (login/register)
- Interactive dropdown menus
- Responsive design
- All buttons and navigation elements

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
JWT_SECRET=your-secret-key-here
PORT=3001
```

### Running the Application

Run both frontend and backend concurrently:
```bash
npm run dev:all
```

Or run them separately:

**Frontend (Next.js)**:
```bash
npm run dev
```
Runs on http://localhost:3000

**Backend (Express)**:
```bash
npm run server
```
Runs on http://localhost:3001

## Project Structure

```
amazon/
├── app/                 # Next.js app directory
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── page.tsx        # Homepage
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Header.tsx      # Main header with all dropdowns
│   ├── HeroSection.tsx # Hero banner section
│   └── ProductSection.tsx # Product grid sections
├── server/            # Express backend
│   └── index.js       # Server and API routes
└── package.json       # Dependencies
```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

## Notes

- User data is stored in-memory (replace with database in production)
- JWT tokens are stored in HTTP-only cookies
- All dropdown menus are fully functional
- Responsive design matches Amazon's layout


# amazon
