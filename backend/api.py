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
    class NewLog(Resource):
        def post(self, user_id: int):
            caption = request.form.get('caption')
            if caption is None:
                return Response.bad_request("This endpoint expects a caption!")
            plant = request.form.get('plant')
            if plant is None:
                return Response.bad_request("This endpoint expects a plant!")
            stage = request.form.get('stage')
            conn = DB()
            try:
                image = request.files.get('image')
                return Response.ok(utility.createLog(image, caption, stage, plant, user_id, conn))
            except Exception as e:
                conn.close()
                raise e
    class GetLogs(Resource):
        def get(self, user_id: int):
            conn = DB()
            try:
                logs = db.User(conn, user_id).get_model_logs()
                return Response.ok(logs)
            except Exception as e:
                conn.close()
                raise e
    class GetRecipes(Resource):
        def get(self, user_id: int):
            conn = DB()
            try:
                plants = db.User(conn, user_id).get_model_plants()
            except Exception as e:
                conn.close()
                raise e
            conn.close()
            return Response.ok(OpenAI.recipe_reqs(plants))
