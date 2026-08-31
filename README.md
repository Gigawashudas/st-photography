ST Photography
A premium, responsive portfolio website for ST Photography, designed to showcase photography and cinematography work through a cinematic, editorial-inspired digital experience.
The project includes a custom portfolio CMS, secure admin dashboard, client enquiry management, responsive layouts, dark/light mode, and production deployment support.

Overview
ST Photography is a custom-built portfolio platform created for a professional photography and cinematography studio.
The website focuses on:
Premium visual presentation
Fast and responsive browsing
Easy project management without coding
Client enquiry collection
Lead management
Mobile-first responsiveness
Dark/light theme support
Clean and maintainable architecture

Features
Public Website
Premium photography-focused visual design
Responsive desktop, tablet, and mobile layouts
Cinematic project presentation
Dynamic project detail pages
Project categories
Project locations and years
Featured projects
Published/unpublished project control
Responsive image galleries
Contact/enquiry form
WhatsApp integration
Email contact integration
Social media links
Dark/light mode
Smooth animations and transitions
SEO-ready structure
Admin Dashboard
A dedicated private dashboard allows the studio to manage the website without modifying code.
Project Management
Create projects
Edit projects
Delete projects
Publish/unpublish projects
Feature/unfeature projects
Control featured project order
Upload/manage project images
Manage project information
Manage project cover images
Lead Management
The admin dashboard includes a dedicated Leads section for incoming client enquiries.
Each enquiry can contain:
Client name
Email address
Phone / WhatsApp number
Requested service
Project date
Location
Budget
Project message
Submission date
The admin can:
Review incoming enquiries
Reply by email
Reply through WhatsApp
Call the client using the provided phone number
View the total number of leads

Technology Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
UI & Animation
Motion
Lucide React
Custom responsive design system
CSS-based theme system
Backend
Next.js API Routes
Supabase
Supabase Authentication
PostgreSQL database
Security & Validation
Zod validation
Server-side authentication
Server-side database operations
Service-role protected admin operations
Enquiry rate limiting
Honeypot spam protection
Deployment
Vercel
GitHub

Project Architecture
st-photography/
│
├── app/
│ ├── admin/
│ │ ├── leads/
│ │ ├── login/
│ │ ├── projects/
│ │ └── page.tsx
│ │
│ ├── api/
│ │ └── enquiries/
│ │
│ ├── work/
│ │ └── [slug]/
│ │
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
│
├── components/
│ ├── admin/
│ ├── contact/
│ ├── theme-toggle/
│ └── ...
│
├── lib/
│ ├── supabase/
│ ├── rate-limit.ts
│ └── ...
│
├── public/
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md

Admin Dashboard
The admin dashboard provides a central control panel for managing the website.
Dashboard statistics include:
Total projects
Published projects
Featured projects
Total leads
The dashboard also provides quick access to:
Projects
Leads
Theme controls
Logout
The admin interface is intentionally separated from the public website navigation and design flow.

Enquiry System
The website includes a custom enquiry workflow.
Submission Flow
Client
│
▼
Contact Form
│
▼
Validation
│
▼
Rate Limiting
│
▼
Next.js API
│
▼
Supabase
│
▼
Enquiry Stored
│
├──► Admin Leads Dashboard
│
└──► Email Notification

The database acts as the primary source for enquiries, allowing leads to remain accessible through the admin dashboard.

Responsive Design
The website is designed to work across:
Mobile phones
Tablets
iPad-sized devices
Laptops
Desktop monitors
Large screens
The interface adapts typography, spacing, grids, navigation, forms, galleries, and content layouts according to screen size.

Theme System
The website supports:
Dark mode
Light mode
Persistent theme selection
Separate admin theme control
Theme preferences are stored locally so the selected mode can persist between page reloads.

Performance & UX
The project emphasizes:
Responsive images
Optimized layouts
Minimal UI clutter
Smooth transitions
Accessible interactive elements
Mobile-friendly controls
Reduced-motion support
Clean typography
Fast navigation

Environment Variables
Create a .env.local file in the project root.
Example:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key

SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

Important
SUPABASE_SERVICE_ROLE_KEY is a server-only secret.
Never expose it through:
Client-side JavaScript
NEXT_PUBLIC_ variables
GitHub
Public source code

Local Development
Clone the repository:
git clone git@github.com:Gigawashudas/st-photography.git

Enter the project:
cd st-photography

Install dependencies:
npm install

Create your environment file:
touch .env.local

Add the required environment variables.
Start the development server:
npm run dev

Open:
http://localhost:3000

Production Build
Before deployment, run:
npm run build

Then start the production server:
npm start

Deployment
The project is designed for deployment on Vercel.
Typical deployment workflow:
Local Development
│
▼
GitHub
│
▼
Vercel
│
▼
Production Website

Environment variables must also be configured in the Vercel project settings.

Database
The project uses Supabase PostgreSQL.
The main data structure includes:
Projects
Stores portfolio projects including:
Title
Slug
Category
Location
Year
Description
Cover image
Project images
Featured status
Featured order
Published status
Enquiries
Stores incoming client leads including:
Name
Email
Phone
Service
Project date
Location
Budget
Message
Created date

Security
The project implements several protections around the enquiry and admin systems.
Supabase authentication for admin access
Server-side database access
Protected service-role credentials
Zod request validation
Rate limiting
Honeypot spam protection
Server-side authentication checks
No sensitive credentials committed to Git

Future Improvements
Possible future enhancements include:
Advanced lead status management
Read/unread enquiry states
Lead notes
Project drag-and-drop ordering
Image optimization pipeline
Automated enquiry emails
Analytics dashboard
Search and filtering for leads
Cloud image management
Custom domain
Automated backups

Project Status
Status: Production-ready / Deployment-ready
The core portfolio, CMS, admin dashboard, enquiry system, lead management, responsive design, and deployment workflow have been implemented.

Credits
Designed and developed for:
ST Photography
Photography & Cinematography Portfolio

License
This project is a custom commercial website developed for ST Photography.
The source code, design, content, photography, branding, and project assets are not licensed for redistribution or commercial reuse without permission from the project owner.
