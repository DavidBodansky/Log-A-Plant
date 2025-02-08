from db import DB
import models

class Log:
    def __init__(self, id: int, db: DB):
        self._id = id
        self._db = db
    @property
    def id(self):
        return self._id
    @property
    def db(self):
        return self._db
    
    def get(self) -> models.Log:
        rows = self.db.read("""
            SELECT
                id, user_id, caption, image_url, stage, date_created
            FROM
                logs
            WHERE
                id = %s
        """, (self.id,))
        if len(rows) == 0:
            raise RuntimeError(f"We could not find a category from the category id ({self.id})")
        row = rows[0]
        return models.Log(
            id = int(row['id']),
            user_id = int(row['user_id']),
            caption = row['caption'],
            image_url = row['image_url'],
            stage = row['stage'],
            date_created = row['date_created'].strftime("%Y-%m-%dT%H:%M:%SZ")
        )
