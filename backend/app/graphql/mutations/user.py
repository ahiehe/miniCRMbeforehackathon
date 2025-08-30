import strawberry

from app.graphql.inputs.user import UserRegisterInput, UserRegister
from app.services.user import UserService

@strawberry.type
class UserMutation:

    @strawberry.mutation()
    async def register_user(
            self,
            user: UserRegisterInput
    ) -> str:
        user_data: UserRegister = user.to_pydantic()
        return await UserService.register_user(user_data)