from backend import app
from flask import render_template,make_response

def readfile(filename):
    F = open(filename) ; R = F.read() ; F.close()
    return R
                          
@app.route('/')
@app.route('/index')
def index():
    SYMjs    = readfile('static/SYM.js')
    FORTHjs  = readfile('static/FORTH.js')
    PEG      = readfile('static/FORTH.peg')
    user = {'username': 'Dmitry'}
    R = render_template('index.html', title='FORTH/js', user=user, peg=PEG, symjs=SYMjs, forthjs=FORTHjs)
    R = make_response(R)
    R.headers['Content-Type'] = 'text/html; charset=utf-8'
    return R

@app.route(r'/black.css')
def css():
    R = make_response(render_template('black.css'))
    R.headers['Content-Type'] = 'text/css; charset=utf-8'
    return R

@app.route('/icon.png')
def icon():
    F = open('static/icon.png', 'rb') ; R = make_response(F.read()) ; F.close()
    R.headers['Content-Type'] = 'image/png'
    return R

def sendjs(filename):
    F = open(filename) ; R = make_response(F.read()) ; F.close()
    R.headers['Content-Type'] = 'application/javascript; charset=utf-8'
    return R

@app.route('/PEG.js')
def PEGjs(): return sendjs('static/PEG.js')

appmanifest = open('static/app.manifest').read()
offmanifest = open('static/offline.manifest').read()
@app.route('/app.manifest')
def appManifest():
    return appmanifest
# @app.route('/offline.manifest')
# def offlineappManifest():
#     R = make_response(offmanifest)
#     R.headers['Content-Type'] = 'Content-Type: text/cache-manifest; charset=utf-8'
#     return R
