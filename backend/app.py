from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from config import Config
from api import API

app = Flask(__name__)
CORS(app)
api = Api(app)

# Server Routing
api.add_resource(API.Test, '/test_connection')
api.add_resource(API.NewCategory, '/user/<int:user_id>/new/category/<string:produce>')
api.add_resource(API.GetCategory, '/user/<int:user_id>/get/category/<int:category_id>')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=Config.PORT, debug=Config.DEVELOPMENT)
