from flask import Blueprint, request, jsonify
from controllers.plant_controller import create_log

api_blueprint = Blueprint('api', __name__)

# Example endpoint: log a plant's progress
@api_blueprint.route('/plants/<plant_id>/logs', methods=['POST'])
def plant_log(plant_id):
    data = request.get_json()  # Expecting JSON data with log details
    result = create_log(plant_id, data)
    return jsonify(result), 201

# You can add more endpoints here (e.g., for AI tips, Q&A, recipes, etc.)
