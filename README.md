KTU Fashion Hub - Complete Windows Setup Guide
Welcome to the KTU Fashion Hub project! This guide will walk you through the complete setup process to get the application running on a Windows computer with only Python installed.


Part 1: Software Installation
    Step 1.1: Install PostgreSQL and pgAdmin
    
    - PostgreSQL is our database, and pgAdmin is the tool we'll use to manage it.
    
    - Download the Installer:
        Go to the official EDB installer page for PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
        Select the latest version (e.g., 15 or 16) and choose Windows x86-64 as the operating system.
        Click the "Download Now" button.
    
    - Run the Installer:
        Open the downloaded installer file.
        During the installation, you can accept the default settings for most steps.
        Crucially, when you get to the "Password" screen, you must create a password for the postgres superuser. Remember this password! It's your master database password.
        On the "Select Components" screen, make sure pgAdmin is checked.
        Complete the installation.



Part 2: Database Configuration
    Step 2.1: Create the Database
    
    - Open pgAdmin: Open your Windows Start Menu and search for "pgAdmin".
    
    - Connect to the Server: When pgAdmin opens, it will ask for the password you created during the PostgreSQL installation. Enter it to connect.
    
    - Create a New Database:
        In the left-hand browser panel, right-click on Databases -> Create -> Database...
        For the Database name, enter ktu_fashion_hub.
        Click the Save button.
        You have now successfully created the empty database for our project.



Part 3: Project Setup
    Now we will set up the Django project itself.
    
    - Step 3.1: Download and Unzip the Project
        Download the project source code as a .zip file.
        Unzip the folder to a memorable location, for example, your Desktop. The folder will be named ktu_fashion_hub.
    
    - Step 3.2: Create and Activate a Virtual Environment
        This creates an isolated environment for our project's Python packages.
        Open Command Prompt: Open the Windows Start Menu and search for cmd or Command Prompt.
        
        Type:
        # cd Desktop\ktu_fashion_hub
    
        And then type:
        # python -m venv venv
        This creates a new folder named venv inside your project.
        
        To activate the Virtual Environment, Type:
        # .\venv\Scripts\activate
        Your command prompt line should now start with (venv), indicating it's active.

    -Step 3.3: Install Required Python Packages
        # pip install -r requirements.txt

    
    - Step 3.4: Configure Project Secrets
        We need to tell Django how to connect to the database you created.
        In the project folder, create a new file named .env.
        Open the file and paste the following, replacing 'your_postgres_password' with the master password you created in Step 1.1.

        # --- Django Settings ---
        SECRET_KEY='django-insecure-adqgex_#rnhu1g%eyw23_gs=5+ill#&o8jnb$ps%_v_r(vbrv#'
        DEBUG=True

        # --- Database Settings ---
        DB_NAME='ktu_fashion_hub'
        DB_USER='postgres'
        DB_PASSWORD='postgre_admin_password'
        DB_HOST='localhost'
        DB_PORT='5432'

    - Step 3.5: Run Database Migrations
        This command creates all the necessary tables in your database.
        Make sure your virtual environment is active.
        In the Command Prompt, run:
            # python manage.py makemigrations
                then,
            # python manage.py migrate
    
    Step 3.6: Create an Admin Superuser
        This creates the main administrator account for uploading fashion projects.
        In the Command Prompt, run:
            # python manage.py createsuperuser
        Follow the prompts to choose a username, email, and password.


Part 4: Running the Application
    You are now ready to start the Django development server.
    Make sure your virtual environment is active.
    
    In the Command Prompt, run:
        # python manage.py runserver