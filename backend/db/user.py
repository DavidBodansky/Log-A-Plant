from db import DB
from db.category import Category
from typing import List
import models

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
                user_id = %s
        """, (self.id,))
        
        categories: List[Category] = []
        for row in rows:
            categories.append(Category(row['id'], self.db))
        return categories

    def get_model_logs(self):
        rows = self.db.read("""
            SELECT
                id, user_id, caption, image_url, stage, plant, date_created
            FROM
                logs
            WHERE
                user_id = %s
            ORDER BY date_created DESC
        """, (self.id,))
        
        logs: List[models.Log] = []
        for row in rows:
            logs.append(models.Log(
                id = int(row['id']),
                user_id = int(row['user_id']),
                caption = row['caption'],
                plant = row['plant'],
                image_url = row['image_url'],
                stage = row['stage'],
                date_created = row['date_created'].strftime("%Y-%m-%dT%H:%M:%SZ")
            ))
        return logs
    def get_model_categories(self):
        rows = self.db.read("""
            SELECT
                id, user_id, produce, date_created
            FROM
                categories
            WHERE
                user_id = %s
            ORDER BY date_created DESC
        """, (self.id,))
        
        categories: List[models.Category] = []
        for row in rows:
            categories.append(models.Category(
                id = int(row['id']),
                user_id = int(row['user_id']),
                produce = row['produce'],
                date_created = row['date_created'].strftime("%Y-%m-%dT%H:%M:%SZ")
            ))
        return categories

    def get(self) -> models.User:
        rows = self.db.read("""
            SELECT
                id, username
            FROM
                users
            WHERE
                id = %s
        """, (self.id,))
        if len(rows) == 0:
            raise RuntimeError(f"We could not find a user from the user id ({self.id})")
        row = rows[0]
        return models.User(
            id = int(row['id']),
            username = row['username']
        )
