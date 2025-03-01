# Lightroom

Lightroom is a Next.js-based web application designed for image management, authentication, and AI-powered features. It integrates multiple modern web technologies to provide a seamless user experience.

## Technologies Used

### Frontend

- **Next.js** – React framework for server-side rendering and static site generation.
- **React** – Component-based UI development.
- **React Hot Toast** – For displaying notifications.
- **Ant Design (AntD)** – UI component library for styling.
- **Lucide Icons** – Icon library for better UI experience.
- **Material-Tailwind/React** – Component styling with Tailwind CSS.

### Backend & API Services

- **Aracjetc** – Used for authentication and validation.
- **Google API** – Integrated AI-powered features.
- **Nodemailer** – Sends emails after successful payments.

### Payment Gateway

- **Razorpay** – Secure payment processing.

### Image Management

- **ImageKit** – Cloud-based image optimization and delivery.

### Database

- **MongoDB & Mongo-Express** – Database storage and management.
- **Mongoose** – ODM for MongoDB.

### Other Technologies

- **TypeScript** – Enhancing code reliability with static typing.
- **Tailwind CSS** – Utility-first CSS framework.
- **Bcrypt.js** – Secure password hashing.
- **React Hook Form** – Form handling and validation.

### Containerization

- **Docker** – Used for containerizing the application.
- **Dockerfile** – Configures the image of the app.

## Features

- **Buy Premium Images** – Users can purchase premium images and download them.
- **Authentication** – Login using email and password or sign up.
- **Shopping Cart** – Add images to the cart and purchase them.
- **Coupon System** – Apply discount coupons during purchases.
- **Order Management** – Users can view their orders and track status.
- **Download Purchased Images** – Users can download images after purchase.
- **Notification System** – Users receive notifications when:
  - Admin uploads a new image.
  - Admin sends a personalized message, viewable in the account section.
- **Secure Payment Gateway** – Integrated with Razorpay for smooth transactions.
- **Responsive UI** – Built with Ant Design and Tailwind CSS for a modern interface.
- **AI-Powered Features** – Leveraging Google API for advanced functionalities.
- **Containerized Application** – Runs in Docker for seamless deployment.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/lightroom.git
   cd lightroom
   ```

2. Install dependencies:

   ```sh
   npm install  # or yarn install
   ```

3. Set up environment variables in a `.env.local` file:

   ```sh
   NEXT_PUBLIC_API_KEY=your_api_key
   DATABASE_URL=your_mongo_db_url
   RAZORPAY_KEY=your_razorpay_key
   ```

4. Run the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

## Running with Docker

1. Build the Docker image:

   ```sh
   docker build -t lightroom-app .
   ```

2. Run the container:

   ```sh
   docker run -p 3000:3000 lightroom-app
   ```

3. If using **MongoDB & Mongo-Express**, start them with Docker Compose:
   ```sh
   docker-compose up -d
   ```
