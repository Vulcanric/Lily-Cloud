#!/usr/bin/env python3
""" Test DB().add_user
"""
from db import DB
from models.user import User


my_db = DB()

first_name = "Ava"
user_1 = my_db.add_user(first_name=first_name, last_name="Harrison", email="jneric49@gmail.com", age=17, hashed_password="MySuperHashedPwd", picture=f"https://placehold.co/600x400/yellow/black/png?font=roboto&text={first_name[0]}")
print(user_1.key(), user_1.pk, user_1, sep="\n")

res = User.find("hsueeusjdjw");
print(res.all());
