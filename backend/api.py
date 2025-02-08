
from flask_restful import Resource
from response import Response

class API:
    class Test(Resource):
        def get(self):
            return Response.ok_custom("connected!")
