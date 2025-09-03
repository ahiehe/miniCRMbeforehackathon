from typing import Any, Union, Awaitable

from strawberry import BasePermission, Info

from app.models import User


class IsAuthenticated(BasePermission):
    message = "You are not authenticated"
    error_extensions = {"code": 401}

    def has_permission(
        self, source: Any, info: Info, **kwargs: Any
    ) -> Union[bool, Awaitable[bool]]:
        user: User = info.context.user
        if user:
            return True
        return False