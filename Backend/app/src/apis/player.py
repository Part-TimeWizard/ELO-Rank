from flask import Blueprint, request, jsonify
from flask_cors import CORS

from ..models.player import Player

player_api = Blueprint('player_api', __name__)
CORS(player_api, supports_credentials=True)


@player_api.route('/get', methods=['GET'])
def get():
    return jsonify(Player.get_all()), 200


@player_api.route('/get_names', methods=['GET'])
def get_names():
    return jsonify(list(Player.get_all().keys())), 200


@player_api.route('/add', methods=['POST'])
def add():
    # This breaks if there is a period in the name. idk why...
    Player.add(players=request.json['players'].split(', '))

    return jsonify({'status': 'ok'}), 200
