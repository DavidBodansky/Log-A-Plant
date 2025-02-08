from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from config import Config
from api import API

app = Flask(__name__)
CORS(app, origins=Config.ALLOWED_ORIGINS)  # Enable Cross-Origin Resource Sharing
api = Api(app)

# Server Routing
api.add_resource(API.Test, '/test_connection')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=Config.PORT, debug=Config.DEVELOPMENT)
