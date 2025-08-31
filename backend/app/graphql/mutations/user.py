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