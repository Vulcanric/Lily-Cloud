#!/usr/bin/env python3
""" Lily's exceptions module
Defines all exceptions due to Lily
"""
from typing import Optional


class NoResultFound(Exception):
    """ Exc. NoResultFound
      Should be raised when there are no result to a database query.
    """
    def __init__(self, message: Optional[str]=None):
        """ Instantiate exception
        """
        super().__init__(message)


class InvalidRequestError(Exception):
    """ Exc. InvalidRequestError
      Should be raised when the request made is invalid.
      Maybe an invalid key or attribute.
    """
    def __init__(self, message: Optional[str]=None):
        """ Instantiate exception
        """
        super().__init__(message)
