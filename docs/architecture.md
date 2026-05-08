# Fernanda Marketing Platform - Architecture

## Overview

The Fernanda Marketing Platform is a microservices-based application designed for marketing campaign management. It consists of two backend services, a React frontend, and PostgreSQL database.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                    (React + Vite)                            │
│                      Port: 3000                              │
└──────────────────────────┬────────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
        ┌─────▼──────┐          ┌──────▼─────┐
        │ Auth       │          │ Opportunity │
        │ Service    │          │ Service     │
        │ Port: 8001 │          │ Port: 8002 │
        └─────┬──────┘          └──────┬─────┘
              │                         │
              └────────────┬────────────┘
                           │
                    ┌──────▼──────┐
                    │ PostgreSQL  │
                    │   Port: 5432 │
                    └─────────────┘
```

## Components

### Auth Service (backend/auth-service)

**Responsibilities:**
- User authentication (login, register)
- JWT token management
- User CRUD operations
- User session management

**Technology:**
- FastAPI
- SQLAlchemy
- PyJWT
- passlib

**Key Files:**
- `main.py` - FastAPI application entry point
- `routes.py` - API route definitions
- `service.py` - Business logic
- `Dockerfile` - Container configuration

### Opportunity Service (backend/opportunity-service)

**Responsibilities:**
- Campaign management
- Task tracking
- Metrics collection
- Report generation

**Technology:**
- FastAPI
- SQLAlchemy
- Pydantic

**Key Files:**
- `main.py` - FastAPI application entry point
- `routes.py` - API route definitions
- `service.py` - Business logic
- `Dockerfile` - Container configuration

### Frontend (frontend/)

**Responsibilities:**
- User interface
- State management
- API communication
- Design system implementation

**Technology:**
- React 18.2.0
- TypeScript 5.0.4
- Vite 4.3.9
- Zustand 4.3.8
- Emotion
- Chart.js

**Key Directories:**
- `src/components/ui/` - Reusable UI components
- `src/pages/` - Page components
- `src/api/` - API clients
- `src/state/` - Zustand stores
- `src/styles/` - Design tokens

### Database

**Technology:** PostgreSQL 15

**Schema:**
- `users` - User accounts
- `campaigns` - Marketing campaigns
- `tasks` - Campaign tasks
- `metrics` - Campaign metrics
- `reports` - Generated reports

## Communication

### Frontend to Backend

The frontend communicates with backend services via HTTP REST APIs:

- Auth Service: `http://localhost:8001`
- Opportunity Service: `http://localhost:8002`

### Backend to Database

Both services connect to PostgreSQL using SQLAlchemy connection strings defined in environment variables.

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled for frontend access
- Environment-based secret management

## Deployment

The application is containerized using Docker and orchestrated with docker-compose. See `docker-compose.yml` for the full service configuration.

## Design System

The frontend implements a design system with consistent:
- Colors (primary, secondary, accent, etc.)
- Typography (Inter font family)
- Spacing scale
- Border radii
- Shadows
- Motion/transition timing

See `frontend/src/styles/tokens.ts` for the complete token definitions.