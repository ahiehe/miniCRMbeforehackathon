from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

from app.graphql.context.getter import context_getter
from app.graphql.schema import schema


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


graphql_app = GraphQLRouter(schema=schema, context_getter=context_getter)
app.include_router(graphql_app, prefix="/graphql")
