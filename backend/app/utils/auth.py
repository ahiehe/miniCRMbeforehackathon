from fastapi import Depends, HTTPException, Request
from jose import jwt
from passlib.context import CryptContext
from app.config import get_auth_data

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def get_password_hash(password: str):
    return pwd_context.hash(password)

async def check_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)

async def create_access_token( data: dict) -> str:
    data_to_encode = data.copy()
    """expire = datetime.now(timezone.utc) + timedelta(days=30)
    data_to_encode.update({"exp": expire})"""
    auth_data = get_auth_data()
    token = jwt.encode(data_to_encode, auth_data['secret_key'], algorithm=auth_data['algorithm'])
    return token

async def decode_access_token(token: str) -> dict:
    auth_data = get_auth_data()
    data = jwt.decode(token, key=auth_data['secret_key'], algorithms=[auth_data['algorithm']])
    return data

async def get_token_from_cookie(request: Request) -> str:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Token not found")

    return token

async def get_current_user(token: str = Depends(get_token_from_cookie)) -> dict:
    try:
        payload = await decode_access_token(token)
        """if datetime.fromtimestamp(payload["exp"]) < datetime.now():
            raise HTTPException(
                status_code=401,
                detail="Token expired",
            )"""

        return payload
    except:
        raise HTTPException(status_code=403, detail="Could not validate credentials")

