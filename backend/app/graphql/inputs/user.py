from typing import List, Optional, Tuple

from pydantic import BaseModel, constr, EmailStr, Field, field_validator
from strawberry.experimental.pydantic import input

class UserRegister(BaseModel):
    email: EmailStr
    password: constr(min_length=1, max_length=60)
    name: constr(min_length=1, max_length=50)

    @field_validator('password', "name")
    def check_ctr(cls, value: str):
        if 1 > len(value):
            return ValueError("String should be bigger than 1 symbol")
        elif len(value) > 50:
            return ValueError("String should be smaller than 50 symbols")
        return value

@input(model=UserRegister, all_fields=True)
class UserRegisterInput:
    pass

class UserLogin(BaseModel):
    email: EmailStr
    password: constr(min_length=1, max_length=60)

    @field_validator('password')
    def check_ctr(cls, value: str):
        if 1 > len(value):
            return ValueError("String should be bigger than 1 symbol")
        elif len(value) > 50:
            return ValueError("String should be smaller than 50 symbols")
        return value

@input(model=UserLogin, all_fields=True)
class UserLoginInput:
    pass
