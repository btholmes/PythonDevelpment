import spotipy
import json
import sys
import spotipy.util as util

from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    # return "Hello World!"
    sp = spotipy.Spotify()
    results = sp.search(q="Red Hot Chili Peppers", limit=50)
    music = "Default"
    for i, t in enumerate(results['tracks']['items']):
        music += str(i) +  "  " + t['name']
        # print i, t['name']
    return json.dumps(results)

if __name__ == '__main__':
    app.run(debug=True)