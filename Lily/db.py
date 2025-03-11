#!/usr/bin/env python3
""" Data storage engine module

 Defines all functionality involved in data storage and
 utilization, mainly CRUD operations.
"""
import redis_om

from Lily.models.user import User
from Lily.models.book import Book

from Lily.exceptions import (NoResultFound, InvalidRequestError)


class DB:
    """ Application storage engine model

    Responsible in making Lily's data persistent.

    Defines CRUD methods such as:
        - add_user: adds a user to the database
        - find_user_by: Retrieves a user on given attributes
        - update_user: updates a user object
    """

    def __init__(self) -> None:
        """ Initialize DB class
        """
        self._DB = redis_om.get_redis_connection(
            host='redis-12130.c100.us-east-1-4.ec2.redns.redis-cloud.com',
            port=12130,
            decode_responses=True,
            username="default",
            password="aigIA6X9fHPKskcx2LEYeGbso49Onay4"
        )
        # Index all User and Book attributes specified to be indexed
        # so I can query database using them. Migrator.run()
        redis_om.Migrator().run()

    def add_user(self, **user_attrbs) -> User:
        """ Create a user object via given attributes
        - add it to the database, and
        - returns it
        """
        user = User(**user_attrbs)
        user.url = f"/user/{user.pk}"
        user.save()
        print(f"Info: User {user.email} is saved successfully")
        return user

    def find_user_by(self, **attribute) -> User:
        """ Get users identified by the given attribute
        attribute is a keyword argument [ User.attrkey=attrvalue ]
        """
        # Valid user attribute str and what they map to in Redis OM
        valid_user_attrbs = {
            "pk": User.pk,
            "first_name": User.first_name,
            "last_name": User.last_name,
            "age": User.age,
            "email": User.email,
            "bio": User.bio,
            "hashed_password": User.hashed_password,
            "reset_token": User.reset_token,
            "session_id": User.session_id,
        }

        attrb_key = list(attribute.keys())[0]
        attrb_value = list(attribute.values())[0]

        try:
            result = User.find(valid_user_attrbs[attrb_key] == attrb_value)
        except KeyError:
            print("Exc InvalidRequestError was raised")
            raise InvalidRequestError

        try:  # User may not be found
            user = result.first()
            print(f"Info: Found user {user.email} with {attribute}")
        except (redis_om.NotFoundError, TypeError):
            print("Info: Lily Exc. NoResultFound was raised")
            raise NoResultFound
        else:
            return user

    def update_user(self, user_pk: str, **attributes) -> None:
        """ Update a user object identified by primary-key/id (user_pk)
        with the given attributes.
        """
        user = self.find_user_by(pk=user_pk)
        user.update(**attributes)
        user.save()
        print(f"User {user.email} is updated successfully with {attributes}")

