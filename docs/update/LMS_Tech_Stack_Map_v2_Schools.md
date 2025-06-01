# Tech Stack Map: Modular LMS (v2 - Multi-School)

## 1. Frontend (Client-side)

| Purpose           | Tool / Tech              | Notes                                  |
|-------------------|--------------------------|----------------------------------------|
| UI Framework      | React (with TypeScript)  | Reusable components, hooks             |
| Build Tool        | Vite                     | Fast development server, modern build  |
| Styling           | Tailwind CSS / CSS Modules | Utility-first styling or scoped styles |
| Routing           | React Router DOM         | Navigation and view switching          |
| HTTP Requests     | Axios                    | Handles API communication              |
| State Management  | React Context / Redux    | For shared app state                   |
| Audio Recording   | MediaRecorder API        | In-browser audio capture               |
| Interactivity     | SortableJS               | Drag-and-drop mechanics                |

## 2. Backend (Server-side)

| Purpose         | Tool / Tech     | Notes                                      |
|------------------|------------------|--------------------------------------------|
| Runtime          | Node.js           | JavaScript execution environment           |
| Web Framework    | Express.js        | Routing, middleware, request handling      |
| ORM              | Prisma            | Type-safe DB access and migrations         |
| Authentication   | JWT + Bcrypt      | Secure login and hashed passwords          |
| File Uploads     | Multer            | Handles audio and file uploads             |
| Real-Time (opt.) | Socket.IO         | Live quiz, chat, feedback                  |
| Access Control   | Middleware by schoolId | Restricts access to own-school data     |

## 3. Database Layer

| Purpose          | Tool / Tech             | Notes                                    |
|------------------|--------------------------|------------------------------------------|
| Database         | PostgreSQL               | Relational, scalable, multi-table joins  |
| Schema Management| Prisma Migrations        | Tracks and applies schema updates        |
| Data Isolation   | SchoolId in all entities | Ensures multi-tenant separation          |
| File Storage     | Cloudinary / AWS S3 / Local | For audio and images (stored externally) |

## 4. Deployment & DevOps

| Purpose               | Tool / Tech              | Notes                                      |
|------------------------|--------------------------|--------------------------------------------|
| Hosting                | Render / Railway / Fly.io / Vercel | Frontend/backend and DB hosting options |
| Environment Management | .env + dotenv            | Manages secrets and config                |
| CI/CD                 | GitHub Actions            | Auto-deploy on push                        |
| Containerization       | Docker (optional)        | Consistent deployment environments         |
| Monitoring             | Sentry / LogRocket       | Error logging and performance monitoring   |