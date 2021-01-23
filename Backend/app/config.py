# Flask packages
from flask_api import FlaskAPI
from flask.cli import FlaskGroup

import pyrebase  # For Firebase interaction

# Define the Flask backend object and set configuration parameters
app = FlaskAPI(__name__)
cli = FlaskGroup(app)

# Initalize a Firebase connection to the databse using pyrebase
firebase = pyrebase.initialize_app({
    'apiKey': 'AIzaSyAzJrZI6MWFof4POxO8RJKys6hNsVQT-p4',
    'authDomain': 'rustrank-92.firebaseapp.com',
    'databaseURL': 'https://rustrank-92-default-rtdb.firebaseio.com',
    'projectId': 'rustrank-92',
    'storageBucket': 'rustrank-92.appspot.com',
    'messagingSenderId': '1075209620185',
    'appId': '1:1075209620185:web:1e29e002d66de5881c4cc8',
    'measurementId': 'G-GS1FY5LJEC'
})

# Create database and authentification variables for Firebase
db = firebase.database()
auth = firebase.auth()
storage = firebase.storage()
