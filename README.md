# BugPro - Bug Tracker

![Project Hero](readme-assets/hero-preview.png)

A modern, minimalistic bug tracking application built with **Vanilla JavaScript** and **HTML5**. This project combines a secure-feeling login flow with a powerful dashboard for managing tasks and bugs, styled with a sleek Glassmorphism aesthetic.

## Features

- **Futuristic UI**: Enhanced glassmorphism design with 3D interactive elements and smooth animations.
- **Theme Support**: Built-in Light and Dark modes.
- **Instant Updates**: Add, close, and delete issues without page reloads using LocalStorage.
- **Responsive**: Fully optimized for desktop and mobile devices.
- **Secure Simulation**: Basic authentication flow to simulate a protected environment.

## Privacy Notice

> [!NOTE]
> **Data Persistence**
> This application uses your browser's **Local Storage** to save tasks. 
> Your data remains on your device and is not sent to any external server. 
> Clearing your browser cache will remove your saved tasks.

## Dashboard Preview

![Dashboard Screenshot](readme-assets/dashboard-screenshot.png)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   **Web Browser**: Chrome, Firefox, Safari, or Edge.
-   **Local Server** (Optional but recommended): Use VS Code Live Server or Python.

### 1. Clone the Repository

Navigate to the project directory:

```bash
git clone https://github.com/WPR-BC-Project/projectX.git
cd projectX
```

### 2. Run the Application

You can simply open `index.html` in your browser, or for the best experience, run a local server:

**Using Python:**
```bash
# Python 3
python3 -m http.server
```

**Using Node (http-server):**
```bash
npx http-server .
```

-   **Login Page**: http://localhost:8000/login.html
-   **Dashboard**: http://localhost:8000/index.html

### 3. Login Credentials

To access the dashboard, use the following demo credentials:

| Username | Password |
|----------|----------|
| `admin`  | `password123` |

## How It's Made

This project leverages a lightweight architecture to ensure high performance without heavy frameworks.

### Technology Stack

-   **Core**:
    -   **HTML5**: Semantic structure.
    -   **Vanilla CSS**: Custom variables, flexbox/grid, and glassmorphism effects.
    -   **Vanilla JavaScript**: DOM manipulation and LocalStorage logic.
-   **Storage**:
    -   **Local Storage**: Browser-based persistence for task data.

### Project Structure

-   `index.html`: Main dashboard view.
-   `login.html`: Authentication interface.
-   `404.html`: Custom error page.
-   `styles.css`: Core design system and utilities.
-   `main.js`: Application logic and state management.
