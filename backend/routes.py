from backend import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Dmitry'}
    return render_template('index.html',title='title',user=user)
