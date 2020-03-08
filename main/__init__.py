import werkzeug
werkzeug.cached_property = werkzeug.utils.cached_property
from flask import Flask
from flask_restplus import Api
from flask import Flask, Blueprint
import secrets
app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

api_blueprint = Blueprint('api', __name__, url_prefix="/api")
api = Api(api_blueprint)

app.register_blueprint(api_blueprint)

from main import routes
