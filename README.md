# Subscription Tracker API

A production-ready RESTful API for managing personal subscriptions, tracking renewal dates, and sending automated email reminders using Upstash Workflows and Arcjet Security.

---

## Overview

The Subscription Tracker API provides an end-to-end backend system that helps users monitor recurring subscriptions. The system features secure authentication, subscription status handling, automated notification schedules based on renewal dates, and dynamic HTML email templates.

---

## Key Features

* **Authentication & Authorization:** Secure user registration and login implemented with JWT (JSON Web Tokens) and bcrypt password hashing.
* **Subscription Management:** Full CRUD capabilities for user subscriptions, supporting multiple categories, currencies, and billing frequencies.
* **Automated Workflow Engine:** Intelligent scheduling managed via Upstash Workflows that automatically triggers email notifications:
  * T-7 days, T-5 days, T-2 days, and T-1 day prior to renewal.
  * Exact expiration date handling, which automatically updates the subscription status to expired.
* **Security & Rate Limiting:** Integrated with Arcjet for bot detection and rate limiting, including custom middleware rules to allow internal workflow requests.
* **Email Notification System:** Responsive HTML email templates generated dynamically and delivered using Nodemailer.

---

## Tech Stack

* **Runtime Environment:** Node.js (ES Modules)
* **Web Framework:** Express.js
* **Database & ORM:** MongoDB & Mongoose
* **Automation:** Upstash Workflow Engine
* **Security & Auth:** Arcjet, JWT, Bcrypt
* **Mailing:** Nodemailer
* **Date Manipulation:** Day.js

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
* Node.js (v18 or higher)
* MongoDB (Local instance or MongoDB Atlas)
* An active Upstash account for QStash/Workflow credentials
* An active Arcjet account for security key configuration

---

### Installation & Local Setup

1. Clone the repository:
git clone https://github.com/YOUR_USERNAME/subscription-tracker.git
cd subscription-tracker

2. Install project dependencies:
npm install

3. Configure Environment Variables:
Create a `.env.development.local` file in the root directory and populate it with the following configuration:

* PORT=5500
* NODE_ENV=development
* DB_URI=your_mongodb_connection_string
* JWT_SECRET=your_jwt_secret_key
* JWT_EXPIRES_IN=7d

# Arcjet Security Configuration
* ARCJET_KEY=ajkey_your_arcjet_key
* ARCJET_ENV=development

# Upstash QStash & Workflow Setup
* QSTASH_URL=http://127.0.0.1:8080
* QSTASH_TOKEN=your_qstash_token

# Email Service (Nodemailer)
* EMAIL_USER=your_email@gmail.com
* EMAIL_PASSWORD=your_app_specific_password

4. Run the Server:
# Development mode with live reload
npm run dev

# Production mode
npm start

---

## API Endpoints Reference

### Authentication Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/sign-up` | Register a new user account | Public |
| `POST` | `/api/v1/auth/sign-in` | Authenticate user and issue JWT | Public |
| `POST` | `/api/v1/auth/sign-out` | Terminate user session | Private |

### User Management Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/users` | Fetch all registered users | Admin / Private |
| `GET` | `/api/v1/users/:id` | Fetch specific user details | Private |

### Subscription Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/subscriptions` | Create a new subscription and trigger workflow | Private |
| `GET` | `/api/v1/subscriptions` | Fetch all active subscriptions for authenticated user | Private |
| `GET` | `/api/v1/subscriptions/:id` | Fetch subscription details by ID | Private |
| `PUT` | `/api/v1/subscriptions/:id` | Update subscription details | Private |
| `DELETE` | `/api/v1/subscriptions/:id` | Delete/Cancel subscription | Private |

### Automated Workflow Trigger Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/workflows/subscription/reminder` | Webhook triggered by Upstash engine to process scheduled tasks | Public (Arcjet Bypassed) |

---

