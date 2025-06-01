# API Documentation: Modular LMS (v2 - Multi-School)

**Base URL**: `http://localhost:3000/api/`  
**Authentication**: JWT via `Authorization: Bearer <token>`

All major entities (users, courses, classes) are now scoped to a specific school.

## 1. School Management

- `POST /schools` - Create a new school  
- `GET /schools` - List all schools (admin only)  
- `GET /schools/:id` - Get details of a specific school

**Example:**

```json
{
  "name": "Phumtham Primary Learning Center"
}
```

## 2. Authentication

- `POST /auth/register` - Register a new user under a school  
- `POST /auth/login` - Log in and receive JWT

**Example:**

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret123",
  "role": "student",
  "schoolId": 1
}
```

**JWT Payload:**

```json
{
  "userId": 5,
  "schoolId": 1,
  "role": "teacher"
}
```

## 3. Courses

Courses are scoped by school.  
`POST /courses`

```json
{
  "title": "English A1",
  "description": "Starter course",
  "level": "A1",
  "schoolId": 1
}
```

## 4. Classes

- `POST /classes` - Create a class under a school  
- `GET /classes/:id` - Get class details

```json
{
  "name": "Grade 4 Advanced",
  "schoolId": 1,
  "teacherId": 9
}
```

## 5. Assignments

Assignments may be created and reused across courses. They are optionally scoped by school.

## 6. Student Progress

Progress is tracked per assignment. School ID is used to enforce data access rules.

## 7. File Upload (Audio)

- `POST /upload/audio`  
  Requires `multipart/form-data`, returns path/URL.

## 8. Admin-only Endpoints

- `GET /users`  
- `PUT /users/:id/role`  
- `DELETE /users/:id`  

## 9. Authorization Rules Summary

| Endpoint Group      | Access Roles                          |
|---------------------|----------------------------------------|
| `/auth/*`           | Public                                 |
| `/schools/*`        | Admin only (system-wide)               |
| `/courses/*`        | Teacher, Admin (within same school)    |
| `/assignments/*`    | Teacher, Admin                         |
| `/progress/*`       | Student (own), Teacher (same school)   |
| `/classes/*`        | Teacher, Admin (same school)           |
| `/upload/audio`     | Student                                |
| `/users/*`          | Admin (within school)                  |