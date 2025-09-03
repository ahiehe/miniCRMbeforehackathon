from typing import Optional

from starlette.requests import Request
from strawberry.fastapi import BaseContext

from app.graphql.context.user_context import UserContext


class Context(BaseContext):
    request: Request
    user: Optional[UserContext]

    def __init__(self, request, user: Optional[UserContext] = None):
        super().__init__()
        self.request = request
        self.user = user