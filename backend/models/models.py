from dataclasses import dataclass
from datetime import datetime
from typing import Union

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
@dataclass
class Log():
    id: int
    user_id: int
    caption: str
    plant: str
    image_url: Union[str, None]
    stage: Union[str, None]
    date_created: datetime
