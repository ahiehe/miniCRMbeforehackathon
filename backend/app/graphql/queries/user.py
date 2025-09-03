import strawberry

from app.graphql.context import Context
from app.graphql.extensions.permissions import IsAuthenticated
from app.graphql.types.token import TokenResponse
from app.graphql.types.user import UserType
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

    @strawberry.field(description="Get me", permission_classes=[IsAuthenticated])
    async def get_me(
            self,
            info: strawberry.Info
    ) -> UserType:
        context: Context = info.context
        return await UserService.get_user(int(context.user.user_id))