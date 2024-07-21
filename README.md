# NewDemy

newDemy is a comprehensive Learning Management System (LMS) designed to facilitate online education. Teachers can create, publish, and sell courses, while students can purchase and learn from these courses. The platform is built using modern technologies to ensure a smooth and efficient user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Teacher functionalities**: Create, publish, and manage courses.
- **Student functionalities**: Browse, purchase, and learn from courses.
- **Video Streaming**: High-quality video streaming and playback.
- **Analytics**: Track course performance and user engagement.
- **Secure Payments**: Integration with Stripe for secure transactions.
- **User Authentication**: Secure user authentication and management.

## Technologies Used

- **Frontend & Backend**: [Next.js](https://nextjs.org/)
- **Styling**: [Shadcn UI](https://shadcn.dev/) and [Tailwind CSS](https://tailwindcss.com/)
- **Video Streaming**: [Mux](https://www.mux.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Payments**: [Stripe](https://stripe.com/)
- **Analytics**: [Recharts](https://recharts.org/)
- **Media Uploads**: [Uploadthing](https://uploadthing.com/)

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- PostgreSQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BeNikk/newDemy.git
   cd newDemy

 2. **npm install**
# or
**yarn install**

3. **Set up the environment variables:**

DATABASE_URL=postgresql://user:password@localhost:5432/newdemy
NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-api-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
MUX_TOKEN_ID=<your-mux-token-id>
MUX_TOKEN_SECRET=<your-mux-token-secret>
UPLOADTHING_API_KEY=<your-uploadthing-api-key>

4. **Run database migrations:**
npx prisma migrate dev

5. **Start the development server**
npm run dev
# or
yarn dev
