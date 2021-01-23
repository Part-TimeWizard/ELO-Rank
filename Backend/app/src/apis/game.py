from flask import Blueprint, request, jsonify
from flask_cors import CORS

from ..models.game import Game

game_api = Blueprint('game_api', __name__)
CORS(game_api, supports_credentials=True)


@game_api.route('/get', methods=['GET'])
def get():
    return jsonify(Game.get()), 200


@game_api.route('/add', methods=['POST'])
def add():
    t1_p1 = request.json['t1_p1']
    t1_p2 = request.json['t1_p2']
    t2_p1 = request.json['t2_p1']
    t2_p2 = request.json['t2_p2']
    t1_score = int(request.json['t1_score'])
    t2_score = int(request.json['t2_score'])
    notes = request.json['notes'] if 'notes' in request.json else None

    Game.add(t1_p1=t1_p1, t1_p2=t1_p2, t2_p1=t2_p1, t2_p2=t2_p2,
             t1_score=t1_score, t2_score=t2_score,  notes=notes)

    return jsonify({'status': 'ok'}), 200
