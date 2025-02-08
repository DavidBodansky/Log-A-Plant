from db.db import DB
from werkzeug.datastructures import FileStorage
import boto3
from config import Config
import uuid

def createLog(image: FileStorage | None, caption: str, stage: str | None, user_id: int, conn: DB):
    image_url = None
    image_uuid = None
    if image is not None:
        image_uuid = uuid.uuid4()
        image_ext = str(image.filename).rsplit('.', 1)[1].lower() if '.' in str(image.filename) else ''
        image_name = f"{image_uuid}.{image_ext}"
        s3 = boto3.client(
            's3',
            aws_access_key_id=Config.AWS_KEY,
            aws_secret_access_key=Config.AWS_SECRET,
            region_name=Config.AWS_REGION
        )
        # image_raw = image.read()
        s3.upload_fileobj(image, "gardening-bucket", image_name)
        image_url = f"https://gardening-bucket.s3.{Config.AWS_REGION}.amazonaws.com/{image_name}"

    created_id = conn.insert("""
        INSERT INTO
            logs
        (user_id, caption, stage, image_url, stage)
        VALUES 
        (%s, %s, %s, %s, %s)
    """, (user_id, caption, stage, image_url, None))
    if created_id is None:
        raise RuntimeError("inserting category in utility.createCategory didn't return a created row id")
    return created_id
    
def createCategory(produce: str, user_id: int, conn: DB):
    created_id = conn.insert("""
        INSERT INTO
            categories
        (user_id, produce)
        VALUES 
        (%s, %s)
    """, (user_id, produce))
    if created_id is None:
        raise RuntimeError("inserting category in utility.createCategory didn't return a created row id")
    return created_id
