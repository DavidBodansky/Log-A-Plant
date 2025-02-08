from dataclasses import dataclass
from datetime import datetime

@dataclass
class Category():
    id: int
    user_id: int
    produce: str
    date_created: datetime
@dataclass
class User():
    id: int
    username: str
@dataclass
class Capture():
    id: int
    user_id: int
    produce_id: int
    caption: str
    date_created: datetime
