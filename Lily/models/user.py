#!/usr/bin/env python3
""" Defines the User model class
"""
import datetime

from redis_om import JsonModel, Field, Migrator
from typing import Optional, List


class User(JsonModel):
    """ Defines a user object
    """
    # 'id' is not necessary as redis_om creates one for me and save it as 'pk'
    first_name: str = Field(index=True)
    last_name:  Optional[str] = Field(index=True, default=None)
    age: int = Field(index=True)
    email: str = Field(index=True)
    picture: Optional[str] = None
    bio: Optional[str] = Field(index=True, full_text_search=True, default=None)
    url: Optional[str] = None
    hashed_password: bytes
    session_id: Optional[str] = Field(index=True, default=None)
    reset_token: Optional[str] = Field(index=True, default=None)
    books: Optional[List[str]] = Field(index=True, default=[])
    created_at: Optional[str] = datetime.datetime.ctime(datetime.datetime.now(datetime.UTC))
    updated_at: Optional[str] = datetime.datetime.ctime(datetime.datetime.now(datetime.UTC))
