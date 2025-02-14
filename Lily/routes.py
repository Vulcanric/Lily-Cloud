#!/usr/bin/env python3
""" Defines all API endpoints and view functions/handler
"""
from flask import (
    Flask, render_template, request,
    make_response, redirect, jsonify,
    url_for, Response, abort
)

from Lily.auth import Auth
from Lily.context import create_template_variables
from Lily.exceptions import NoResultFound

from urllib.parse import quote


app = Flask(__name__, template_folder="./templates")
AUTH = Auth()


@app.route("/")
def home():
    """ Home page view function/handler
    """
    template_variables = create_template_variables(request)
    template_variables["title"] = "Welcome to Lily"
    return render_template("home.html", **template_variables)


@app.route("/register", methods=["GET", "POST"])
def register() -> Response:
    """ Registers a user and logs them in automatically
    """
    template_variables = create_template_variables(request)
    if request.method == "GET":
        template_variables["title"] = "Sign up to get started"
        template_variables["form_page"] = True
        template_variables["register"] = True
        return render_template("register.html", **template_variables)
    else:  # POST
        try:
            user = AUTH.register_user(**request.form)
            session_id = AUTH.create_session(user.email)
            response = make_response(jsonify({"status": 1, "reason": "Registration successful"}))
            response.set_cookie("session_id", session_id)
        except ValueError:  # User email already registered
            response = jsonify({"status": -1, "reason": "Email already registered"}), 400  # Bad request
        return response


@app.route("/login", methods=["GET", "POST"])
def login():
    """ Log a user in
    """
    template_variables = create_template_variables(request)
    if request.method == "GET":
        template_variables["form_page"] = True
        return render_template("login.html", **template_variables)
    else:  # POST
        email = request.form.get("email")
        password = request.form.get("password")
        if AUTH.valid_login(email, password):
            session_id = AUTH.create_session(email)
            response = make_response(jsonify({"status": 1, "reason": "Signed in successfully!"}))
            response.set_cookie("session_id", session_id)
        else:
            response = jsonify({"status": -1, "reason": "This account doen't exist or incorrect password"}), 403  # Forbidden
        return response

@app.route("/logout", methods=["DELETE"])
def logout():
    """ Logs a user out by destroying their session
    """
    session_id = request.cookies["session_id"]
    try:
        user = AUTH.get_user_from_session_id(session_id)
    except NoResultFound:
        abort(403)  # It is FORBIDDEN to logout when not loggedin
    else:
        print(f"INFO: Received request to end user {user.email} session ")
        session_id = AUTH.destroy_session(user.email)
    return redirect(url_for("home"), 303) # Handled by JS in the client side


@app.route("/user")
def user():
    """ This endpoint defines an overview of a user's personal space.
    It displays rectangular boxes to the user:
        - Box 1: my profile { When user click, takes them to their profile
        - Box 2: my books { When clicked, takes them to books written, read and recommended }
        - Box 3: my club { When clicked, takes them to their club }
    """
    return render_template("user.html")


@app.route("/book/<string:action>")
def book(action: str) -> Response:
    """ This endpoint defines an overview of interacting(read/write) with books.
    It supplies all endpoints to books.
    """
    template_variables = create_template_variables(request)
    if action == "create":
        title = "Create a book"
    elif action == "read":
        title = ""
    elif action == "search":
        title = "What's your favorite genre?"

    template_variables["title"] = title
    template_variables["action"] = action
    template_variables["quote"] = quote;
    return render_template("book.html", **template_variables)


@app.errorhandler(404)
def not_found(error):
    """ When a user navigates to an invalid url/endpoint, lead them back home :)
    """
    print(f"Debug: Got a 404 NotFound Error {error}")
    return """
<h1>The page you're looking for is not found</h1>
<p>It seems like you clicked on a wrong url, did you write it yourselve? No worries, just click the button below to go back home</p>
<p>If you feel this is an error, contact the developer with an email here <a href="mailto://jneric49@gmail.com">johneric@lily.com</a></p>
<button class="lilyButtons" onclick="document.location = '/'">Go Home</button>
""", 404
