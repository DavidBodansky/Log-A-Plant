from flask import jsonify
from typing import Any
class Response():
    @staticmethod
    def bad_request(msg: str):
        response = jsonify(msg)
        response.status = 400
        return response
    @staticmethod
    def ok(data: Any):
        response = jsonify(data)
        response.status_code = 200
        return response
    @staticmethod
    def forbidden(msg: str):
        response = jsonify(msg)
        response.status_code = 401
        return response
    @staticmethod
    def internal_error(msg: str):
        response = jsonify(msg)
        response.status_code = 500
        return response
    @staticmethod
    def bad_gateway(msg: str):
        response = jsonify(msg)
        response.status_code = 502
        return response

