import httpx
from fastapi import Depends, HTTPException, Request
from jose import jwt
from passlib.context import CryptContext
from app.config import get_auth_data, settings

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

async def get_token_from_header(request: Request) -> str:
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing Authorization header")

    token = auth_header.split(" ")[1]
    return token

async def exchange_code_for_token(code: str) -> dict:
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        token_data = resp.json()
    return token_data

async def get_user_data_by_google_token(access_token: str) -> dict:
    async with httpx.AsyncClient() as client:
        userinfo_resp = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        profile = userinfo_resp.json()

    return profile


async def get_current_user(token: str = Depends(get_token_from_header)) -> dict:
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

