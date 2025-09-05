import strawberry

from app.graphql.inputs.user import UserRegisterInput, UserRegister
from app.graphql.types.token import TokenResponse
from app.services.user import UserService

@strawberry.type
class UserMutation:

    @strawberry.mutation()
    async def register_user(
            self,
            user: UserRegisterInput
    ) -> TokenResponse:
        user_data: UserRegister = user.to_pydantic()
        return TokenResponse(token=await UserService.register_user(user_data))

    @strawberry.mutation()
    async def login_with_google_user(
            self,
            code: str
    ) -> TokenResponse:
        return TokenResponse(token=await UserService.authenticate_user_with_google(code))