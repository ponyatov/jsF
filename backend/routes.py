from backend import app
from flask import render_template,make_response

@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Dmitry'}
    R = render_template('index.html',title='jsF',user=user)
    R = make_response(R)
    R.headers['Content-Type'] = 'text/html; charset=utf-8'
    return R

@app.route(r'/black.css')
def css():
    R = render_template('black.css')
    R = make_response(R)
    R.headers['Content-Type'] = 'text/css; charset=utf-8'
    return R
