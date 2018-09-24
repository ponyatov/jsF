from backend import app
from flask import render_template,make_response


@app.route('/')
@app.route('/index')
def index():
    peg_full = open('static/FORTH.peg').read()
    peg_min  = open('static/minimal.peg').read()
    user = {'username': 'Dmitry'}
    R = render_template('index.html',title='jsF',user=user,peg=peg_min)
    R = make_response(R)
    R.headers['Content-Type'] = 'text/html; charset=utf-8'
    return R

@app.route(r'/black.css')
def css():
    R = render_template('black.css')
    R = make_response(R)
    R.headers['Content-Type'] = 'text/css; charset=utf-8'
    return R

@app.route('/icon.png')
def icon():
    F = open('static/icon.png','rb') ; R = F.read() ; F.close()
    R = make_response(R)
    R.headers['Content-Type'] = 'image/png'
    return R

def sendjs(filename):
    F = open(filename) ; R = F.read() ; F.close()
    R = make_response(R)
    R.headers['Content-Type'] = 'application/javascript; charset=utf-8'
    return R

@app.route('/FORTH.js')
def FORTHjs():
    return sendjs('static/FORTH.js')
@app.route('/SYM.js')
def SYMjs():
    return sendjs('static/PEG.js')
@app.route('/PEG.js')
def PEGjs():
    return sendjs('static/PEG.js')
@app.route('/manifest')
def manifest():
    return sendjs('static/manifest')
