# Manufacturing Execution System - Frontend

## Project Description
The idea of this project is a manufacturing system, where all the information of the process can be logged into the system, making sure that the specifications for each type of product are followed properly. This is the frontend component of the system, providing the user interface for operators and administrators.

## Tech Stack
* React
* Vite
* TailwindCSS / Shadcn (if applicable based on UI styling)
* Axios for API requests

## Setup Instructions

1. **Navigate to the frontend directory:**
   ```bash
   cd BSB_MES_react
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Environment Setup:**
   If the project requires specific environment variables (like the backend API URL), create a `.env` file in the root of the `BSB_MES_react` directory:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
   *(Adjust the URL if your backend runs on a different host or port)*

## Running the Application

To run the frontend development server:

```bash
npm run dev
```

This will start the Vite development server, usually accessible at `http://localhost:5173`. Open this URL in your browser to view the application.
