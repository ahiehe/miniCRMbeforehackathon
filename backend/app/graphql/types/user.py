import strawberry

from app.models import User


@strawberry.type(description="User type")
class UserType:
    id: int
    name: str
    email: str



    @staticmethod
    def from_orm(user: User) -> 'UserType':
        return UserType(
            id=user.id,
            name=user.name,
            email=user.email
        )