# Functional Specification: Modular LMS (v2 - Multi-School)

## 1. Project Overview

This LMS supports modular, reusable assignments grouped into Courses. Each Course belongs to a specific School. The platform supports multiple schools, each with its own users, classes, and courses.

## 2. User Roles

| Role    | Capabilities                                           |
|---------|--------------------------------------------------------|
| Admin   | Manages all users, courses, and classes within a school. |
| Teacher | Creates courses, assigns assignments, tracks progress. |
| Student | Enrolls in courses, completes assignments, views feedback. |

## 3. Key Features

### Assignments:
- Modular and reusable
- Support multiple types (drag-drop, audio, MCQ)
- Stored independently of courses

### Courses:
- Defined by teachers within a school
- Linked to multiple assignments
- Students enroll per course

### Classes:
- Represent real-world groups
- Linked to one teacher and many students

### Multi-School Support:
- All data is scoped to schools
- Users and courses belong to a specific school

## 4. User Stories

| As a... | I want to...                       | So that I can...                         |
|---------|------------------------------------|------------------------------------------|
| Teacher | Create a course with assignments  | Provide a structured learning path       |
| Student | View and complete assignments     | Make learning progress visible           |
| Admin   | Invite new users to school        | Ensure only verified users access system |
| Teacher | Track progress of my class        | Support learning interventions           |
| Admin   | Create multiple classes           | Organize users for reporting             |

## 5. Assignment Types

- Drag-and-Drop
- Audio Recording
- Multiple Choice
- Fill-in-the-Blanks

## 6. Minimum Viable Product (MVP)

- ✅ User auth with school assignment
- ✅ Course and assignment management
- ✅ Class creation and student enrollment
- ✅ Assignment completion and progress tracking
- ✅ Audio upload handling
- ✅ Admin role per school
- ❌ Grading and teacher feedback system (Phase 2)

## 7. Database Entities Summary

School, User, Course, Class, Assignment, Progress, UserCourse, CourseAssignment