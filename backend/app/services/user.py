from fastapi import HTTPException

from app.database import get_session
from app.graphql.inputs.user import  UserRegister
from app.models import User
from app.repositories.user import UserRepository

from app.utils.auth import get_password_hash, create_access_token, check_password


class UserService:

    @staticmethod
    async def register_user(user_data: UserRegister) -> str:
        async with get_session() as session:
            user = await UserRepository.get_user_by_email(session, str(user_data.email))
            if user:
                raise HTTPException(status_code=400, detail="User already exists")
            password_hash = await get_password_hash(user_data.password)

            new_user_model = User(email=str(user_data.email), password_hash=password_hash, name=user_data.name)
            new_user_created = await UserRepository.create_user(session, new_user_model)

            token = await create_access_token({"id": new_user_created.id})
            return token

    @staticmethod
    async def authenticate_user(email, password) -> str:
        async with get_session() as session:
            user = await UserRepository.get_user_by_email(session, str(email))

            if not user:
                raise HTTPException(status_code=400, detail="Invalid email or password")

            if not await check_password(password, user.password_hash):
                raise HTTPException(status_code=400, detail="Invalid email or password")

            token = await create_access_token({"id": user.id})
            return token

