from db.db import DB

def createCategory(produce: str, user_id: int, db: DB):
    created_id = db.insert("""
        INSERT INTO
            categories
        (user_id, produce)
        VALUES 
        (%s, %s)
    """, (user_id, produce))

    if created_id is None:
        raise RuntimeError("inserting category in utility.createCategory didn't return a created row id")
    return created_id
