# Fernanda Marketing Platform

A comprehensive marketing campaign management platform built with FastAPI, React, and PostgreSQL.

## Prerequisites

- Docker 24.0.2+
- docker-compose 1.29.2+
- Python 3.11+ (for local development)
- Node.js 18+ (for local frontend development)

## Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd fernanda-marketing
cp .env.example .env
```

### 2. Start with Docker

```bash
./run.sh
```

This will:
- Build all Docker images
- Start all services (PostgreSQL, auth-service, opportunity-service, frontend)
- Verify all services are healthy

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Auth Service API**: http://localhost:8001
- **Opportunity Service API**: http://localhost:8002

## Architecture

### Backend Services

- **Auth Service (Port 8001)**: Handles authentication, user management, JWT tokens
- **Opportunity Service (Port 8002)**: Manages campaigns, tasks, metrics, and reports

### Frontend

- React 18 with TypeScript
- Vite for bundling
- Zustand for state management
- Emotion for styling with design tokens

### Database

- PostgreSQL 15

## API Endpoints

### Auth Service (Port 8001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | Login with email/password |
| POST | /auth/register | Register new user |
| GET | /auth/me | Get current user |
| GET | /users/ | List all users |
| GET | /users/{id} | Get user by ID |
| PUT | /users/{id} | Update user |
| DELETE | /users/{id} | Delete user |

### Opportunity Service (Port 8002)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /campaigns/ | List all campaigns |
| POST | /campaigns/ | Create campaign |
| GET | /campaigns/{id} | Get campaign |
| PUT | /campaigns/{id} | Update campaign |
| DELETE | /campaigns/{id} | Delete campaign |
| GET | /tasks/ | List all tasks |
| POST | /tasks/ | Create task |
| GET | /tasks/{id} | Get task |
| PUT | /tasks/{id} | Update task |
| DELETE | /tasks/{id} | Delete task |
| GET | /metrics/?campaign_id={id} | Get metrics |
| POST | /metrics/ | Create metric |
| GET | /reports/?campaign_id={id} | Get reports |
| POST | /reports/ | Create report |

## Development

### Backend Local Development

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Local Development

```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Services not starting

Check logs: `docker-compose logs -f`

### Database connection issues

Ensure PostgreSQL is healthy: `docker-compose ps db`

### Frontend not loading

Check if all backend services are healthy first.

## Environment Variables

See `.env.example` for all available configuration options.