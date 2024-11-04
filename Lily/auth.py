#!/usr/bin/env python3
""" Authentication module

 Defines every functionality used for authentication
 and authorization.
"""
import uuid
import bcrypt

from Lily.models.user import User
from Lily.models.book import Book
from Lily.db import DB
from Lily.exceptions import NoResultFound


def _hash_password_(password: str) -> bytes:
    """ Hash a user's password
    """
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())


def _generate_uuid_() -> str:
    """Generates and returns a string representation of a new UUID
    """
    return str(uuid.uuid4())


class Auth:
    """ Authentication engine
    Serves as a proxy(middleman) between the application's front-end
    clients and the database storage engine (DB), authenticating every
    activity performed on Lily.
    """
    def __init__(self) -> None:
        """ Instantiate Auth object and connect to DB engine
        """
        self._db = DB()

    def register_user(self, **attributes) -> User:
        """ Register a new user

        If user already exist, raise ValueError(User <useremail> already exists)
        Otherwise, save user to database and return the user object
        """
        # Check if the email is already registered
        try:
            user = self._db.find_user_by(email=attributes["email"])
        except NoResultFound:  # Email is not already registered
            # Include a place holder profile picture and replace
            # password with a hashed version
            print("Before ->", attributes, sep="\n")

            attributes.update({
                "picture": f"https://eu.ui-avatars.com/api/?name={attributes.get('first_name')}+{attributes.get('last_name')}&size=50",
                "hashed_password": _hash_password_(attributes["password"]),
            })
            attributes.pop("password")

            print("After ->", attributes, sep="\n")
            user = self._db.add_user(**attributes)
            print("User ->", user, sep="\n")
        else:
            print("Exc ValueError was raised")
            raise ValueError(f"User {attributes["email"]} already exists")

        print(f"Info: User {user.email} registered")
        return user


    def create_session(self, user_email: str) -> str:
        """ Creates a new session for a user identified by `user_email`.
         Updates the user with the session and
         Returns the session.
        """
        session_id = _generate_uuid_()
        user = self._db.find_user_by(email=user_email)
        self._db.update_user(user.pk, session_id=session_id)
        print(f"Info: Session created successfully for user {user.email} [{session_id}]")
        return session_id
    
    def destroy_session(self, user_email: str) -> None:
        """ Destroys the current session of a user identified by user_email
        """
        user = self._db.find_user_by(email=user_email)
        self._db.update_user(user.pk, session_id=None)
        print(f"Info: Session destroyed successfully for user {user.email}")

    def get_user_from_session_id(self, session_id: str) -> User:
        """ Gets a user having the specified session id
        """
        user = self._db.find_user_by(session_id=session_id)
        return user

    def valid_login(self, email: str, password: str) -> bool:
        """ Validates a user logging in.
        """
        try:
            user = self._db.find_user_by(email=email)
        except NoResultFound:
            return False
        else:  # If such user exist, verify that password is correct
            if not bcrypt.checkpw(password.encode(), user.hashed_password):
                return False
        return True
