from db import DB

class User:
    def __init__(self, db: DB, id: int):
        self._id = id
        self._db = db
    @property
    def id(self):
        return self._id
    @property
    def db(self):
        return self._db

    def get_categories(self):
        rows = self.db.read("""
            SELECT
                id
            FROM
                categories
            WHERE
                user_id = ?
        """, (self.id,))
