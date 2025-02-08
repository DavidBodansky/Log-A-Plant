
from flask_restful import Resource
from response import Response
from modules.openAI import OpenAI
from flask import request

class API:
    class Test(Resource):
        def get(self):
            return Response.ok_custom("connected!")
    class Ask(Resource):
        def get(self):
            prompt = request.args.get("prompt", "good car company")
            return Response.ok_custom(OpenAI.ask(prompt))