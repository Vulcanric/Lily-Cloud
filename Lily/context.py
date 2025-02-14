#!/usr/bin/env python3
""" The Context (Developer's dashboard)
Used in manipulating the frontend interface/appearance dynamically at any time without
breaking the application.
Usefull for adding new features/updates.
"""
from Lily.auth import Auth
from Lily.exceptions import NoResultFound

from flask import Request
from typing import Dict, Any


AUTH = Auth()

book_genres = [
    {
        "genre_name": "Fantasy",
        "genre_image_url": "https://files.fm/thumb_show.php?i=cr9td24yhu"
    },
    {
        "genre_name": "Adventure",
        "genre_image_url": "https://files.fm/thumb_show.php?i=4t5paus39m"
    },
    {
        "genre_name": "Science Fiction",
        "genre_image_url": "https://files.fm/thumb_show.php?i=cg4nthnv5n"
    },
    {
        "genre_name": "Children Story Book",
        "genre_image_url": "https://files.fm/thumb_show.php?i=j6prvu79z6"
    },
    {
        "genre_name": "Comics",
        "genre_image_url": "https://files.fm/thumb_show.php?i=5rt2u8be6j"
    },
    {
        "genre_name": "Educative Books",
        "genre_image_url": "https://files.fm/thumb_show.php?i=uzrkfvafcu"
    },
    {
        "genre_name": "Mystery | Thriller",
        "genre_image_url": "https://files.fm/thumb_show.php?i=9fvggnx8sf"
    }
]


def create_template_variables(request: Request) -> Dict[str, Any]:
    """ Create template's context-variables with initial values based on values
    found on the given request object.

    It returns a dict containing all the initial information required by the
    template.
    """
    try:
        user = AUTH.get_user_from_session_id(request.cookies.get("session_id"))
    except NoResultFound:
        user = None
    template_variables = {
        "title": "",
        "is_signedin": True if user else False,
        "user_name": f"{user.first_name} {user.last_name}" if user else None,
        "user": user if user else None,
        "form_page": False,
        "register": False,
        "book_genres": book_genres,
    }
    # Log some info to stdout
    print(f"Is SignedIn: {template_variables.get('is_signedin')}")
    return template_variables
