# TaskMaster MVP Specification

## 1. Architecture

### Architecture Overview
The architecture of TaskMaster is designed as a simple web application following the MVC (Model-View-Controller) pattern. The web application consists of:

- **Client-Side Front-End**: Built with HTML, CSS, and JavaScript.
- **Server-Side Back-End**: Built with Node.js and Express.
- **Database**: A relational database (e.g., MySQL or PostgreSQL) to store user tasks and related information.

### Components
- **Front-End**: Handles user interactions and communicates with the back-end via API calls.
- **Back-End**: Processes requests, interacts with the database, and returns responses.
- **Database**: Stores user tasks, user data, and other necessary information.

## 2. APIs and Methods

### API Routes
- **/api/tasks**
  - `GET`: Retrieves a list of tasks for the logged-in user.
  - `POST`: Creates a new task for the user.
  - `PUT`: Updates an existing task (e.g., marking it as completed).
  - `DELETE`: Deletes a task.
  
- **/api/users**
  - `POST`: Registers a new user.
  - `GET`: Retrieves user profile information based on the session.

### 3rd Party APIs
- **None for MVP**.

## 3. Data Model



### Users Table
- `id`: Primary Key
- `username`: String, unique
- `email`: String, unique
- `password`: String

### Tasks Table
- `id`: Primary Key
- `user_id`: Foreign Key (references Users)
- `title`: String
- `description`: Text
- `due_date`: DateTime
- `completed`: Boolean

## 4. User Stories

- **As a user, I want to create tasks** so that I can manage my to-do list.
- **As a user, I want to view all my tasks** so that I can see what needs to be done.
- **As a user, I want to update tasks** so that I can mark them as completed.
- **As a user, I want to delete tasks** so that I can remove tasks I no longer need.
- **As a user, I want to register and log in** so that I can save and manage my tasks securely.

## 5. Mockups

### TaskMaster Interface Mockups
- **Home Page**: Displays a list of tasks with options to add, edit, or delete tasks.
- **Task Creation Page**: A form for creating a new task with fields for title, description, and due date.
- **Task Edit Page**: A form similar to the creation page, pre-filled with task details for editing.
- **Login/Signup Pages**: Simple forms for user registration and authentication.
