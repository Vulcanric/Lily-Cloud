#!/usr/bin/python3
""" Define the Book model
"""
import datetime
from redis_om import JsonModel, Field
from typing import Optional, List


class Book(JsonModel):
    """ Defines a book
    """
    # 'id' is not necessary as redis_om creates one for me and save it as 'pk'
    author_id: str = Field(index=True)  # author's id (user.pk)
    title: str = Field(index=True)
    description: str = Field(index=True, full_text_search=True)  # aka Sypnosis
    book_cover: str
    thumbnail: str
    genre: str = Field(index=True)
    age_limit: Optional[int] = Field(index=True, default=2)
    content: Optional[str] = Field(index=True, default=None)  # key of book Hash (<book_pk>:content)
    tags: Optional[List[str]] = Field(index=True, default=None)
    views: Optional[int] = 0
    stars: Optional[int] = 0
    created_at: Optional[str] = datetime.datetime.ctime(datetime.datetime.now(datetime.UTC))
    updated_at: Optional[str] = datetime.datetime.ctime(datetime.datetime.now(datetime.UTC))

"""
Lily Book object:
    author_id: strin
"""