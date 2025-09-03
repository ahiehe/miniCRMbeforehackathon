from starlette.requests import Request

from app.graphql.context import Context, UserContext
from app.utils.auth import decode_access_token


async def context_getter(request: Request) -> Context:
    token = request.headers.get("Authorization")
    user = None
    if token and token.startswith("Bearer "):
        token = token.split(" ")[1]
        decoded_token = await decode_access_token(token)
        user = UserContext(user_id=decoded_token.get("id"))
    return Context(user=user, request=request)