from db import DB
from datetime import datetime
import models

class Capture:
    def __init__(self, id: int, db: DB):
        self._id = id
        self._db = db
    @property
    def id(self):
        return self._id
    @property
    def db(self):
        return self._db
    
    def get(self) -> models.Capture:
        rows = self.db.read("""
            SELECT
                id, user_id, produce_id, caption, date_created
            FROM
                categories
            WHERE
                id = %s
        """, (self.id,))
        if len(rows) == 0:
            raise RuntimeError(f"We could not find a capture from the capture id ({self.id})")
        row = rows[0]
        return models.Capture(
            id = int(row['id']),
            user_id = int(row['user_id']),
            produce_id = row['produce_id'],
            caption = row['caption'],
            date_created = row['date_created'].strftime("%Y-%m-%dT%H:%M:%SZ")
        )
