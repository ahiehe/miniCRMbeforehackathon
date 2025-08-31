import strawberry

from app.graphql.types.token import TokenResponse
from app.services.user import UserService

@strawberry.type
class UserQuery:

    @strawberry.field(description="Login user query")
    async def login_user(
            self,
            email: str,
            password: str,
    ) -> TokenResponse:
        return TokenResponse(token=await UserService.authenticate_user(email, password))