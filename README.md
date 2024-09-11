# Lily Cloud Book Software

## Description
Lily is a cloud web application software, designed specifically to foster the love for reading and learning in kids and teens.

## 🗂️ Project Structure
```plaintext
Lily-Cloud/
|
├── app.py                  # Main application file
├── auth.py                 # Authentication System via Redis
├── db.py                   # Database engine
├── server_setup.sh         # Application server setup
├── README.md               # Document project
├── Lily/                   # Application package
|   ├── __init__.py         # Initialize application python package
|   ├── routes.py           # API handling + (views)
|   ├── models/             # Blueprints for object instances
|   |   ├── base.py         # Base/Parent model
|   |   ├── user.py         # User model
|   |   └── book.py         # Book model
|   ├── templates/          # Application HTML templates using Jinja/Flask
|   |   ├── base.html       # Base template (inheritable)
|   |   ├── home.html       # Application home page
|   |   ├── register.html   # Signup page for registration
|   |   ├── login.html      # Login page for authentication
|   |   ├── read.html       # Reading a book page plus dynamic content (Customization)
|   |   └── write.html      # Writing a book page plus Customization
|   └── static/             # Static files (CSS, JavaScript, images)
|       ├── style.css       # Main CSS styling sheet
|       └── script.js       # Main JavaScript for Front-End logic and API interactions
└── test/                   # Unittest for application
    ├── __init__.py         # Initialize unittest package
    └── test_routes.py      # Test Application routes
```