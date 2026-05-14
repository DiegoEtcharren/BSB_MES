# Manufacturing Execution System - Backend

## Project Description
The idea of this project is a manufacturing system, where all the information of the process can be logged into the system, making sure that the specifications for each type of product are followed properly. This is the backend API component of the system.

## Tech Stack
* PHP
* Laravel framework
* SQLite / MySQL (depending on environment configuration)

## Setup Instructions

1. **Clone the repository and navigate to the backend directory:**
   ```bash
   cd BSB_MES_Laravel
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Environment Setup:**
   Copy the example environment file and configure it as needed.
   ```bash
   cp .env.example .env
   ```

4. **Generate Application Key:**
   ```bash
   php artisan key:generate
   ```

5. **Database Setup:**
   Configure your database in the `.env` file, then run the migrations.
   ```bash
   php artisan migrate
   ```
   *(Optional)* Run seeders if applicable:
   ```bash
   php artisan db:seed
   ```

## Running the Application

To run the application locally, use the Artisan development server:

```bash
php artisan serve
```

The API will typically be available at `http://localhost:8000`. Ensure that your CORS settings in `config/cors.php` or the `.env` file are configured to allow requests from your React frontend.
