# SPEC.md

## 1. TECHNOLOGY STACK

**Backend:**
- Python 3.11
- FastAPI 0.95.2
- SQLAlchemy 2.0.19
- PostgreSQL 15
- Pydantic 1.10.7
- Uvicorn 0.22.0
- PyJWT 2.7.0
- passlib 1.7.4

**Frontend:**
- React 18.2.0
- Vite 4.3.9
- TypeScript 5.0.4
- React Router DOM 6.14.1
- Zustand 4.3.8
- Axios 1.4.0
- Chart.js 4.3.0
- @radix-ui/react-dialog 1.0.4
- @radix-ui/react-tooltip 1.0.4
- @radix-ui/react-toast 1.0.4
- @radix-ui/react-switch 1.0.4
- @radix-ui/react-checkbox 1.0.4
- @radix-ui/react-radio-group 1.0.4
- @radix-ui/react-avatar 1.0.4
- @radix-ui/react-select 1.0.4
- @radix-ui/react-dropdown-menu 1.0.4
- @radix-ui/react-badge 1.0.4
- @radix-ui/react-progress 1.0.4
- @radix-ui/react-toast 1.0.4
- @emotion/react 11.11.1
- @emotion/styled 11.11.0

**DevOps/Infrastructure:**
- Docker 24.0.2
- docker-compose 1.29.2

---

## 2. DATA CONTRACTS

### Python (Pydantic) Models

```python
# backend/shared/models.py

from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class User(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    is_active: bool

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: str

class UserUpdate(BaseModel):
    full_name: Optional[str]
    password: Optional[str]
    role: Optional[str]
    is_active: Optional[bool]

class Token(BaseModel):
    access_token: str
    token_type: str

class Campaign(BaseModel):
    id: int
    name: str
    description: str
    status: str
    start_date: datetime
    end_date: datetime
    budget: float
    roi: float
    owner_id: int

class CampaignCreate(BaseModel):
    name: str
    description: str
    status: str
    start_date: datetime
    end_date: datetime
    budget: float
    roi: float
    owner_id: int

class CampaignUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    status: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    budget: Optional[float]
    roi: Optional[float]
    owner_id: Optional[int]

class Task(BaseModel):
    id: int
    title: str
    description: str
    status: str
    due_date: datetime
    assigned_to: int
    campaign_id: int

class TaskCreate(BaseModel):
    title: str
    description: str
    status: str
    due_date: datetime
    assigned_to: int
    campaign_id: int

class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]
    due_date: Optional[datetime]
    assigned_to: Optional[int]
    campaign_id: Optional[int]

class Metric(BaseModel):
    id: int
    campaign_id: int
    name: str
    value: float
    timestamp: datetime

class MetricCreate(BaseModel):
    campaign_id: int
    name: str
    value: float
    timestamp: datetime

class Report(BaseModel):
    id: int
    campaign_id: int
    generated_at: datetime
    url: str

class ReportCreate(BaseModel):
    campaign_id: int
    url: str
```

### TypeScript Interfaces

```typescript
// frontend/src/types/models.ts

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
}

export interface UserCreate {
  email: string;
  full_name: string;
  password: string;
  role: string;
}

export interface UserUpdate {
  full_name?: string;
  password?: string;
  role?: string;
  is_active?: boolean;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  status: string;
  start_date: string; // ISO8601
  end_date: string;   // ISO8601
  budget: number;
  roi: number;
  owner_id: number;
}

export interface CampaignCreate {
  name: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  budget: number;
  roi: number;
  owner_id: number;
}

export interface CampaignUpdate {
  name?: string;
  description?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  roi?: number;
  owner_id?: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  assigned_to: number;
  campaign_id: number;
}

export interface TaskCreate {
  title: string;
  description: string;
  status: string;
  due_date: string;
  assigned_to: number;
  campaign_id: number;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: string;
  due_date?: string;
  assigned_to?: number;
  campaign_id?: number;
}

export interface Metric {
  id: number;
  campaign_id: number;
  name: string;
  value: number;
  timestamp: string;
}

export interface MetricCreate {
  campaign_id: number;
  name: string;
  value: number;
  timestamp: string;
}

export interface Report {
  id: number;
  campaign_id: number;
  generated_at: string;
  url: string;
}

export interface ReportCreate {
  campaign_id: number;
  url: string;
}
```

---

## 3. API ENDPOINTS

### Auth Service

- **POST /auth/login**
  - Request: `{ email: string, password: string }`
  - Response: `Token`
- **POST /auth/register**
  - Request: `UserCreate`
  - Response: `User`
- **GET /auth/me**
  - Request: Bearer token
  - Response: `User`

### User Management

- **GET /users/**
  - Response: `User[]`
- **GET /users/{user_id}**
  - Response: `User`
- **PUT /users/{user_id}**
  - Request: `UserUpdate`
  - Response: `User`
- **DELETE /users/{user_id}**
  - Response: `{ detail: string }`

### Campaigns

- **GET /campaigns/**
  - Response: `Campaign[]`
- **POST /campaigns/**
  - Request: `CampaignCreate`
  - Response: `Campaign`
- **GET /campaigns/{campaign_id}**
  - Response: `Campaign`
- **PUT /campaigns/{campaign_id}**
  - Request: `CampaignUpdate`
  - Response: `Campaign`
- **DELETE /campaigns/{campaign_id}**
  - Response: `{ detail: string }`

### Tasks

- **GET /tasks/**
  - Response: `Task[]`
- **POST /tasks/**
  - Request: `TaskCreate`
  - Response: `Task`
- **GET /tasks/{task_id}**
  - Response: `Task`
- **PUT /tasks/{task_id}**
  - Request: `TaskUpdate`
  - Response: `Task`
- **DELETE /tasks/{task_id}**
  - Response: `{ detail: string }`

### Metrics

- **GET /metrics/?campaign_id={id}**
  - Response: `Metric[]`
- **POST /metrics/**
  - Request: `MetricCreate`
  - Response: `Metric`

### Reports

- **GET /reports/?campaign_id={id}**
  - Response: `Report[]`
- **POST /reports/**
  - Request: `ReportCreate`
  - Response: `Report`

---

## 4. FILE STRUCTURE

### PORT TABLE

| Service              | Listening Port | Path                        |
|----------------------|---------------|-----------------------------|
| auth-service         | 8001          | backend/auth-service/       |
| opportunity-service  | 8002          | backend/opportunity-service/|

### SHARED MODULES

| Shared path         | Imported by services                        |
|---------------------|---------------------------------------------|
| backend/shared/     | auth-service, opportunity-service           |

### FILE TREE

```
.
├── docker-compose.yml                # Multi-service orchestration
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── README.md                        # Project documentation
├── run.sh                           # Root startup script
├── backend/
│   ├── shared/
│   │   ├── models.py                # Pydantic models (shared)
│   │   ├── db.py                    # DB connection utilities
│   │   ├── auth.py                  # JWT and password utils
│   │   └── __init__.py
│   ├── auth-service/
│   │   ├── main.py                  # FastAPI app entrypoint
│   │   ├── routes.py                # Auth/user endpoints
│   │   ├── service.py               # Auth/user business logic
│   │   ├── Dockerfile               # Auth service Dockerfile (EXPOSE 8001)
│   │   ├── tests/
│   │   │   ├── test_auth.py         # Auth endpoints tests
│   │   │   └── test_users.py        # User endpoints tests
│   │   └── __init__.py
│   ├── opportunity-service/
│   │   ├── main.py                  # FastAPI app entrypoint
│   │   ├── routes.py                # Campaign/task/metric/report endpoints
│   │   ├── service.py               # Campaign/task/metric/report logic
│   │   ├── Dockerfile               # Opportunity service Dockerfile (EXPOSE 8002)
│   │   ├── tests/
│   │   │   ├── test_campaigns.py    # Campaign endpoints tests
│   │   │   ├── test_tasks.py        # Task endpoints tests
│   │   │   ├── test_metrics.py      # Metric endpoints tests
│   │   │   └── test_reports.py      # Report endpoints tests
│   │   └── __init__.py
│   └── requirements.txt             # Backend Python dependencies
├── frontend/
│   ├── Dockerfile                   # Frontend Dockerfile
│   ├── vite.config.ts               # Vite config
│   ├── tsconfig.json                # TypeScript config
│   ├── package.json                 # NPM dependencies
│   ├── public/
│   │   └── index.html               # HTML entrypoint
│   ├── src/
│   │   ├── main.tsx                 # React entrypoint
│   │   ├── App.tsx                  # App root
│   │   ├── routes.tsx               # Route definitions
│   │   ├── types/
│   │   │   └── models.ts            # TypeScript interfaces (mirrors backend)
│   │   ├── api/
│   │   │   ├── auth.ts              # Auth API client
│   │   │   ├── users.ts             # User API client
│   │   │   ├── campaigns.ts         # Campaign API client
│   │   │   ├── tasks.ts             # Task API client
│   │   │   ├── metrics.ts           # Metric API client
│   │   │   └── reports.ts           # Report API client
│   │   ├── state/
│   │   │   ├── useAuth.ts           # Auth state (Zustand)
│   │   │   ├── useUsers.ts          # Users state
│   │   │   ├── useCampaigns.ts      # Campaigns state
│   │   │   ├── useTasks.ts          # Tasks state
│   │   │   ├── useMetrics.ts        # Metrics state
│   │   │   └── useReports.ts        # Reports state
│   │   ├── styles/
│   │   │   └── tokens.ts            # Design tokens (verbatim from UI/UX contract)
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx                   # Botón primario, secundario, outline, ghost
│   │   │   │   ├── TextField.tsx                # Campo de texto (input)
│   │   │   │   ├── Select.tsx                   # Select y dropdown
│   │   │   │   ├── Checkbox.tsx                 # Checkbox
│   │   │   │   ├── RadioButton.tsx              # Radio button
│   │   │   │   ├── Switch.tsx                   # Switch (toggle)
│   │   │   │   ├── Modal.tsx                    # Modal / Diálogo
│   │   │   │   ├── Card.tsx                     # Tarjeta (métrica, campaña, tarea)
│   │   │   │   ├── Table.tsx                    # Tabla con ordenación y selección
│   │   │   │   ├── SearchBar.tsx                # Barra de búsqueda
│   │   │   │   ├── FilterChip.tsx               # Filtros (chip)
│   │   │   │   ├── DropdownFilter.tsx           # Filtros (dropdown)
│   │   │   │   ├── Avatar.tsx                   # Avatar con iniciales
│   │   │   │   ├── Badge.tsx                    # Badge para estados
│   │   │   │   ├── ProgressBar.tsx              # Progress bar
│   │   │   │   ├── Tooltip.tsx                  # Tooltip
│   │   │   │   ├── Toast.tsx                    # Toast / Snackbar
│   │   │   │   ├── Sidebar.tsx                  # Sidebar de navegación
│   │   │   │   ├── Header.tsx                   # Header con logo, búsqueda, avatar
│   │   │   │   ├── BarChart.tsx                 # Gráfico de barras (placeholder)
│   │   │   │   ├── LineChart.tsx                # Gráfico de líneas (placeholder)
│   │   │   │   └── PieChart.tsx                 # Gráfico de pastel (placeholder)
│   │   ├── pages/
│   │   │   ├── Login.tsx                        # Login page
│   │   │   ├── Dashboard.tsx                    # Dashboard page
│   │   │   ├── GestionCampanas.tsx              # Gestión de Campañas page
│   │   │   ├── DetalleCampana.tsx               # Detalle de Campaña page
│   │   │   ├── SeguimientoTareas.tsx            # Seguimiento de Tareas page
│   │   │   ├── MetricasReportes.tsx             # Métricas y Reportes page
│   │   │   ├── GestionUsuarios.tsx              # Gestión de Usuarios page
│   │   │   └── DesignSystemOverview.tsx         # Design System Overview page
│   │   └── index.tsx                            # (optional) Export barrel
└──
```

---

## 5. ENVIRONMENT VARIABLES

| Name                      | Type     | Description                                      | Example Value                |
|---------------------------|----------|--------------------------------------------------|------------------------------|
| POSTGRES_DB               | string   | PostgreSQL database name                         | fernanda_marketing           |
| POSTGRES_USER             | string   | PostgreSQL username                              | fernanda                     |
| POSTGRES_PASSWORD         | string   | PostgreSQL password                              | supersecret                  |
| POSTGRES_HOST             | string   | PostgreSQL host                                  | db                           |
| POSTGRES_PORT             | integer  | PostgreSQL port                                  | 5432                         |
| AUTH_JWT_SECRET           | string   | JWT secret for auth-service                      | change_this_secret           |
| AUTH_JWT_ALGORITHM        | string   | JWT algorithm                                    | HS256                        |
| AUTH_ACCESS_TOKEN_EXPIRE  | integer  | JWT access token expiry (minutes)                | 60                           |
| OPPORTUNITY_DB_URL        | string   | SQLAlchemy DB URL for opportunity-service        | postgresql://...             |
| AUTH_DB_URL               | string   | SQLAlchemy DB URL for auth-service               | postgresql://...             |
| FRONTEND_API_URL          | string   | Base URL for frontend API requests               | http://localhost:8001        |
| NODE_ENV                  | string   | Frontend environment                             | development                  |

---

## 6. IMPORT CONTRACTS

**Backend:**

- `from shared.models import User, UserCreate, UserUpdate, Token, Campaign, CampaignCreate, CampaignUpdate, Task, TaskCreate, TaskUpdate, Metric, MetricCreate, Report, ReportCreate`
- `from shared.db import get_db, Base`
- `from shared.auth import create_access_token, verify_password, get_password_hash, decode_token`

**Frontend:**

- `import { User, UserCreate, UserUpdate, Token, Campaign, CampaignCreate, CampaignUpdate, Task, TaskCreate, TaskUpdate, Metric, MetricCreate, Report, ReportCreate } from '../types/models'`
- `import { useAuth } from '../state/useAuth'`
- `import { useUsers } from '../state/useUsers'`
- `import { useCampaigns } from '../state/useCampaigns'`
- `import { useTasks } from '../state/useTasks'`
- `import { useMetrics } from '../state/useMetrics'`
- `import { useReports } from '../state/useReports'`
- `import { tokens } from '../styles/tokens'`
- `import { Button } from '../components/ui/Button'`
- `import { TextField } from '../components/ui/TextField'`
- `import { Select } from '../components/ui/Select'`
- `import { Checkbox } from '../components/ui/Checkbox'`
- `import { RadioButton } from '../components/ui/RadioButton'`
- `import { Switch } from '../components/ui/Switch'`
- `import { Modal } from '../components/ui/Modal'`
- `import { Card } from '../components/ui/Card'`
- `import { Table } from '../components/ui/Table'`
- `import { SearchBar } from '../components/ui/SearchBar'`
- `import { FilterChip } from '../components/ui/FilterChip'`
- `import { DropdownFilter } from '../components/ui/DropdownFilter'`
- `import { Avatar } from '../components/ui/Avatar'`
- `import { Badge } from '../components/ui/Badge'`
- `import { ProgressBar } from '../components/ui/ProgressBar'`
- `import { Tooltip } from '../components/ui/Tooltip'`
- `import { Toast } from '../components/ui/Toast'`
- `import { Sidebar } from '../components/ui/Sidebar'`
- `import { Header } from '../components/ui/Header'`
- `import { BarChart } from '../components/ui/BarChart'`
- `import { LineChart } from '../components/ui/LineChart'`
- `import { PieChart } from '../components/ui/PieChart'`

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Zustand State Hooks

- `useAuth() → { user: User | null, token: string | null, loading: boolean, error: string | null, login: (email: string, password: string) => Promise<void>, logout: () => void, register: (data: UserCreate) => Promise<void> }`
- `useUsers() → { users: User[], loading: boolean, error: string | null, fetchUsers: () => Promise<void>, updateUser: (id: number, data: UserUpdate) => Promise<void>, deleteUser: (id: number) => Promise<void> }`
- `useCampaigns() → { campaigns: Campaign[], loading: boolean, error: string | null, fetchCampaigns: () => Promise<void>, createCampaign: (data: CampaignCreate) => Promise<void>, updateCampaign: (id: number, data: CampaignUpdate) => Promise<void>, deleteCampaign: (id: number) => Promise<void> }`
- `useTasks() → { tasks: Task[], loading: boolean, error: string | null, fetchTasks: () => Promise<void>, createTask: (data: TaskCreate) => Promise<void>, updateTask: (id: number, data: TaskUpdate) => Promise<void>, deleteTask: (id: number) => Promise<void> }`
- `useMetrics() → { metrics: Metric[], loading: boolean, error: string | null, fetchMetrics: (campaignId: number) => Promise<void>, createMetric: (data: MetricCreate) => Promise<void> }`
- `useReports() → { reports: Report[], loading: boolean, error: string | null, fetchReports: (campaignId: number) => Promise<void>, createReport: (data: ReportCreate) => Promise<void> }`

### UI Component Props/Inputs

- `Button` props: `{ variant: 'primary' | 'secondary' | 'outline' | 'ghost', children: React.ReactNode, onClick?: () => void, disabled?: boolean, loading?: boolean, type?: 'button' | 'submit' | 'reset', icon?: React.ReactNode }`
- `TextField` props: `{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string, error?: string, type?: string, icon?: React.ReactNode, disabled?: boolean, name?: string }`
- `Select` props: `{ label: string, value: string, onChange: (value: string) => void, options: { label: string, value: string }[], error?: string, disabled?: boolean }`
- `Checkbox` props: `{ checked: boolean, onChange: (checked: boolean) => void, label?: string, disabled?: boolean }`
- `RadioButton` props: `{ checked: boolean, onChange: (checked: boolean) => void, label?: string, name: string, value: string, disabled?: boolean }`
- `Switch` props: `{ checked: boolean, onChange: (checked: boolean) => void, label?: string, disabled?: boolean }`
- `Modal` props: `{ open: boolean, onOpenChange: (open: boolean) => void, title?: string, children: React.ReactNode, footer?: React.ReactNode }`
- `Card` props: `{ variant: 'metric' | 'campaign' | 'task', children: React.ReactNode, header?: React.ReactNode, footer?: React.ReactNode }`
- `Table` props: `{ columns: { key: string, label: string, sortable?: boolean }[], data: any[], onSort?: (key: string, direction: 'asc' | 'desc') => void, onSelectRow?: (row: any) => void, selectedRowIds?: number[] }`
- `SearchBar` props: `{ value: string, onChange: (value: string) => void, placeholder?: string }`
- `FilterChip` props: `{ label: string, selected: boolean, onClick: () => void }`
- `DropdownFilter` props: `{ label: string, value: string, onChange: (value: string) => void, options: { label: string, value: string }[] }`
- `Avatar` props: `{ initials: string, src?: string, alt?: string, size?: number }`
- `Badge` props: `{ status: 'activo' | 'pausado' | 'completado' | string, children?: React.ReactNode }`
- `ProgressBar` props: `{ value: number, max: number }`
- `Tooltip` props: `{ content: React.ReactNode, children: React.ReactNode }`
- `Toast` props: `{ open: boolean, onOpenChange: (open: boolean) => void, title: string, description?: string, status?: 'success' | 'error' | 'warning' }`
- `Sidebar` props: `{ items: { label: string, icon: React.ReactNode, path: string }[], activePath: string, onNavigate: (path: string) => void }`
- `Header` props: `{ user: User, onLogout: () => void, onSearch: (query: string) => void }`
- `BarChart` props: `{ data: { label: string, value: number }[], title?: string }`
- `LineChart` props: `{ data: { label: string, value: number }[], title?: string }`
- `PieChart` props: `{ data: { label: string, value: number }[], title?: string }`

---

## 8. FILE EXTENSION CONVENTION

- All frontend files use `.tsx` (TypeScript React).
- The project is TypeScript throughout frontend.
- Entry point: `/src/main.tsx` (as referenced in `public/index.html` via `<script type="module" src="/src/main.tsx"></script>`).

---

## 9. DESIGN TOKENS

```typescript
// frontend/src/styles/tokens.ts

export const tokens = {
  colors: {
    primary: "#1A73E8",
    primary_dark: "#1557B0",
    primary_light: "#E8F0FE",
    secondary: "#34A853",
    secondary_dark: "#2D8F47",
    accent: "#FBBC04",
    danger: "#EA4335",
    background: "#F8F9FA",
    surface: "#FFFFFF",
    text_primary: "#202124",
    text_secondary: "#5F6368",
    text_on_primary: "#FFFFFF",
    border: "#DADCE0",
    success: "#34A853",
    warning: "#FBBC04",
    error: "#EA4335"
  },
  typography: {
    font_family: "Inter, sans-serif",
    headings: {
      h1: { size: 32, weight: 700, line_height: 1.2 },
      h2: { size: 24, weight: 600, line_height: 1.3 },
      h3: { size: 20, weight: 600, line_height: 1.4 },
      h4: { size: 18, weight: 500, line_height: 1.4 }
    },
    body: { size: 16, weight: 400, line_height: 1.5 },
    small: { size: 14, weight: 400, line_height: 1.4 },
    caption: { size: 12, weight: 400, line_height: 1.3 }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.12)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.1)"
  },
  icon_style: "Outline, 24px default, stroke width 2, rounded caps",
  image_style: "Fotografías de marketing de alta calidad, con esquinas redondeadas (8px) y sombra suave",
  motion: "Transiciones suaves de 200-300ms, easing ease-in-out. Microinteracciones en hover y focus."
};
```