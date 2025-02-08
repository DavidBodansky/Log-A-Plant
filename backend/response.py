from flask import jsonify, make_response
from typing import Any
class Response():
    @staticmethod
    def bad_request(msg: str):
        response = jsonify({
            'status': False,
            'message': msg,
            'data': None
        })
        response.status = 400
        return response
    @staticmethod
    def ok(data: Any, msg: str):
        response = jsonify({
            'status': True,
            'message': msg,
            'data': data
        })
        response.status_code = 200
        return response
    @staticmethod
    def ok_custom(text: str):
        response = make_response(text)
        response.status_code = 200
        return response
    @staticmethod
    def forbidden(msg: str):
        response = jsonify({
            'status': False,
            'message': msg,
            'data': None
        })
        response.status_code = 401
        return response
    @staticmethod
    def internal_error(msg: str):
        response = jsonify({
            'status': False,
            'message': msg,
            'data': None
        })
        response.status_code = 500
        return response
    @staticmethod
    def bad_gateway(msg: str):
        response = jsonify({
            'status': False,
            'message': msg,
            'data': None
        })
        response.status_code = 502
        return response

