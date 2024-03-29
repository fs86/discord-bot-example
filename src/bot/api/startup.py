from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi_discord import Unauthorized

from api.containers import Container
from api.exceptions import InvalidPermissions, RequiresGuildOwner
from api.routes import router as api_router

app = FastAPI(swagger_ui_parameters={"persistAuthorization": True})
app.container = Container()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.exception_handler(Unauthorized)
async def unauthorized_error_handler(_, __):
    return JSONResponse({"error": "Unauthorized"}, status_code=401)


@app.exception_handler(InvalidPermissions)
@app.exception_handler(RequiresGuildOwner)
async def invalid_permissions_error_handler(_, __):
    return JSONResponse({"error": "Forbidden"}, status_code=403)
