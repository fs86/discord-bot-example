import datetime

from beanie import Document


class Permissions(Document):
    member_id: int
    is_admin: bool

    class Collection:
        name = "permissions"

    class Settings:
        use_cache = True
        cache_expiration_time = datetime.timedelta(minutes=30)
        cache_capacity = 5
