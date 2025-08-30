import strawberry

from app.services.user import UserService

@strawberry.type
class UserQuery:

    @strawberry.field(description="Login user query")
    async def login_user(
            self,
            email: str,
            password: str,
    ) -> str:
        return await UserService.authenticate_user(email, password)