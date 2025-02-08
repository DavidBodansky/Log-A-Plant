from flask import Flask
from flask_cors import CORS
from backend.routes.api_routes import api_blueprint
import config

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing
app.config.from_object(config.Config)

# Register API blueprint with a URL prefix (e.g., /api)
app.register_blueprint(api_blueprint, url_prefix='/api')

if __name__ == '__main__':
    port = app.config.get("PORT", 5000)
    app.run(host='0.0.0.0', port=port, debug=True)
