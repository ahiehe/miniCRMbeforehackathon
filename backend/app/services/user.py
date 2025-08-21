from backend.app.database import get_session


async def reg():
    async with get_session() as session:
        session.execute()