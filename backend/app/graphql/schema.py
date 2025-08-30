import strawberry

from app.graphql.mutations.user import UserMutation
from app.graphql.queries.user import UserQuery


@strawberry.type
class Query(UserQuery):
    pass


@strawberry.type
class Mutation(UserMutation):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)
