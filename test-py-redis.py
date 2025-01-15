#!/usr/bin/env python3
from redis_om import (
    JsonModel,
    Field,
    Migrator
)

class User(JsonModel):
    # Setting any field as index means I want to query/search for users via those fields
    id: str = Field(primary_key=True, index=True)
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)
    age: int
    profession: str = Field(index=True)

eric = User(
    id="1",
    first_name="Eric",
    last_name="John",
    age=17,
    profession="Software Engineer"
)

ava = User(
    id="2",
    first_name="Ava",
    last_name="Harrison",
    age=19,
    profession="Author"
)

boniface = User(
    id="3",
    first_name="Boniface",
    last_name="",
    age=32,
    profession="Software Engineer"
)

print(eric)
print(ava)
print(boniface)
