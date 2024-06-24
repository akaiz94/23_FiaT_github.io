from typing import List

from schemas.graphql.Book import BookSchema


# import strawberry


# @strawberry.type(description="Author Schema")
class AuthorSchema:
    id: int
    name: str
    books: List[BookSchema]


# @strawberry.input(description="Author Mutation Schema")
class AuthorMutationSchema:
    name: str
