# Hivemind - Smart Home Automation & Security Solutions

A modern, responsive website for Hivemind, a smart home automation and security solutions company. Built with Next.js and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI**: Clean, professional design with smooth animations
- **One-Page Layout**: Easy navigation with smooth scrolling
- **Component-Based Architecture**: Built with React components for maintainability

## Sections

- Hero section with background image
- About Hivemind
- Services offered (Home Automation, Smart Lighting, Wi-Fi & Network Solutions, Security)
- Why Choose Us (benefits)
- Testimonials from satisfied customers
- Contact form

## Technologies Used

- **Next.js**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better development experience

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/a7mads/hivemind.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

### Deploying to Vercel

The site can be easily deployed to Vercel or any other hosting platform that supports Next.js.

### Deploying to a Self-Hosted Nginx Server with Docker

This project includes Docker and Nginx configuration for deploying to a self-hosted server:

1. Make sure you have Docker and Docker Compose installed on your server.

2. Clone the repository:
   ```
   git clone https://github.com/a7mads/hivemind.git
   cd hivemind
   ```

3. Update the `docker-compose.yml` file to use your existing Nginx container:
   ```yaml
   nginx:
     image: your-nginx-container  # Replace with your actual Nginx container name
   ```

4. Build and run the containers:
   ```
   docker-compose up -d
   ```

5. The Next.js application will be built as static files and served by your Nginx container.

6. Access your website at your server's IP address or domain name.

## License

MIT
