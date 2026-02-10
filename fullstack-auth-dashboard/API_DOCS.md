# API Documentation

## Authentication

### Register User
- **URL**: `/api/users`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created` with User object and JWT token.

### Login User
- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` with User object and JWT token.

### Get User Profile
- **URL**: `/api/users/profile`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with User profile data.

## Tasks

### Get All Tasks
- **URL**: `/api/tasks`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with array of tasks belonging to the user.

### Create Task
- **URL**: `/api/tasks`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs",
    "status": "pending" // optional: 'pending', 'in-progress', 'completed'
  }
  ```
- **Response**: `201 Created` with the created Task object.

### Update Task
- **URL**: `/api/tasks/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: (Any fields to update)
  ```json
  {
    "status": "completed"
  }
  ```
- **Response**: `200 OK` with updated Task object.

### Delete Task
- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with `{ id: <deleted_task_id> }`.
