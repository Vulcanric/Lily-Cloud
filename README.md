# Lily (Cloud Book Software) 🥀

## Description
Lily is a cloud book software, designed specifically to foster the love for reading and learning in kids and teens.
This software was built as a way to increase the rate of reading and writing in kids and teenagers, feature an intuitive, friendly and appealing user interface

## ✨ Features and Functionalities
1. Converts text to audio using Google's TTS (Text-To-Speech) API.

2. Ability to choose voice gender that is suitable and sparks up the child's enthusiasm towards the book.

3. Unique and appealing user interface using imagery to spark up imaginations

4. Personalized and friendly AI chatbot:
  - Helps users find the right book that fits their personality or meets their requirements.
  - Helps writers/authors with idea nuturing, involving follow-up conversations to bring the idea to life, but never writes the book for them.
  - Acts as a general-purpose companion, friend, advisor and assistant
  - Always positive.

5. Break times
  - Tracks the amount of time a writer spends writing a book and after a certain amount asks the writer if they would want to take a break.
  Question-Head: Would you love to take a break?
  Reason: You've been writing/reading for a long time now, try to look at something distant, away from the screen for 20 seconds  (Idea gotten from LG gram)
  Options: No, Yes
  - Listens to audio from the user's environment and askes the user if they would want to take a break to attend to their environment. E.g parent calling, noisy background, e.t.c
  Question-Head: Would you love to take a break?
  Reason: We've heard a noise from your surrounding and thought you'd want to attend to it.
  Options: No, Yes

6. User's dashboard
7. Parent's dashboard for younger kids

## 🗂️ Project Structure
```plaintext
Lily-Cloud/
|
├── app.py                  # Main application file
├── server_setup.sh         # Application server setup
├── README.md               # Document project
├── Lily/                   # Application main package
|   ├── __init__.py         # Initialize application python package
|   ├── db.py               # Data storage engine
|   ├── auth.py             # Authentication System, authenticating every activity performed
|   ├── routes.py           # Defines all Back-End API Endpoints
|   ├── models/             # Blueprints for object instances
|   |   ├── __init__.py     # Initialize models
|   |   ├── user.py         # User model
|   |   └── book.py         # Book model
|   ├── templates/          # Application HTML templates using Jinja2 templating syntax
|   |   ├── base.html       # Base template of all templates (inheritable)
|   |   ├── home.html       # Application home page
|   |   ├── form.html       # Base template for all form pages (register.html, login.html).
|   |   ├── register.html   # Signup page for registration
|   |   ├── login.html      # Login page for authentication
|   |   ├── user.html       # Reading a book page plus dynamic content (Customization)
|   |   └── book.html       # Writing a book page plus Customization
|   └── static/             # Static files (CSS, JavaScript, images)
|       ├── styles.css      # Main CSS styling sheet
|       └── script.js       # Main JavaScript for Front-End logic and API interactions
└── test/                   # Unittest for application
    ├── __init__.py         # Initialize unittest package
    └── test_routes.py      # Test Application routes
```
