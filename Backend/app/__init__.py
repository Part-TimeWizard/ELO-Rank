# Flask import
from .config import app

# Import routes
from .src.apis.game import game_api
from .src.apis.player import player_api

# Register blueprints
app.register_blueprint(game_api, url_prefix='/api/game')
app.register_blueprint(player_api, url_prefix='/api/player')
