from db import DB
from flask_restful import Resource
from db.category import Category
from response import Response
import utility
from modules.openAI import OpenAI
from flask import request

class API:
    class Test(Resource):
        def get(self):
            return Response.ok("connected!")
    class NewCategory(Resource):
        def get(self, user_id: int, produce: str):
            db = DB()
            try:
                return Response.ok(utility.createCategory(produce, user_id, db))
            except Exception as e:
                db.close()
                raise e
    class GetCategory(Resource):
        def get(self, user_id: int, category_id: int):
            db = DB()
            try:
                category = Category(id=category_id, db=db)
                return Response.ok(category.get())
            except Exception as e:
                db.close()
                raise e
    class Ask(Resource):
        def get(self):
            prompt = request.args.get("prompt", "good car company")
            return Response.ok_custom(OpenAI.ask(prompt))
