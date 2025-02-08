
from flask_restful import Resource
from response import Response
from modules.openAI import OpenAI

class API:
    class Test(Resource):
        def get(self):
            return Response.ok_custom("connected!")
    class Ask(Resource):
        def get(self):
            return Response.ok_custom(OpenAI.ask("good car companies"))