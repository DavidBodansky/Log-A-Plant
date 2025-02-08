from db import DB
import db
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
            conn = DB()
            try:
                return Response.ok(utility.createCategory(produce, user_id, conn))
            except Exception as e:
                conn.close()
                raise e
    class GetCategory(Resource):
        def get(self, user_id: int, category_id: int):
            conn = DB()
            try:
                category = Category(id=category_id, db=conn)
                return Response.ok(category.get())
            except Exception as e:
                conn.close()
                raise e
    class GetCategories(Resource):
        def get(self, user_id: int):
            conn = DB()
            try:
                categories = db.User(conn, user_id).get_model_categories()
                return Response.ok(categories)
            except Exception as e:
                conn.close()
                raise e
    class Ask(Resource):
        def get(self):
            prompt = request.args.get("prompt", "good car company")
            return Response.ok(OpenAI.ask(prompt))
