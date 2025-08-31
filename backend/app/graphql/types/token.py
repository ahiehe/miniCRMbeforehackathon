import strawberry


@strawberry.type
class TokenResponse:
    token: str