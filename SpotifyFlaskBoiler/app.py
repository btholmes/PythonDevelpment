import spotipy
import json
import sys
import spotipy.util as util

from flask import Flask
from string import Template
app = Flask(__name__)

mePage = Template("""
   <h1>This is the me page template for ${name}</h1>
""")


@app.route('/')
def hello():
    # return "Hello World!"
    # sp = spotipy.Spotify()
    # results = sp.search(q="Red Hot Chili Peppers", limit=50)
    # music = "Default"
    # for i, t in enumerate(results['tracks']['items']):
    #     music += str(i) +  "  " + t['name']
    #     # print i, t['name']
    # return json.dumps(results)
    def show_tracks(tracks):
        for i, item in enumerate(tracks['items']):
            track = item['track']
            print "   %d %32.32s %s" % (i, track['artists'][0]['name'],
                                        track['name'])
    def showUserPlaylists(str) :
        # if __name__ == '__main__':
        # if len(sys.argv) > 1:
        #     username = sys.argv[1]
        # else:
        #     print "Whoops, need your username!"
        #     print "usage: python user_playlists.py [username]"
        #     sys.exit()
        token = util.prompt_for_user_token(str)

        if token:
            sp = spotipy.Spotify(auth=token)
            playlists = sp.user_playlists(str)
            for playlist in playlists['items']:
                if playlist['owner']['id'] == str:
                    print
                    print playlist['name']
                    print '  total tracks', playlist['tracks']['total']
                    results = sp.user_playlist(str, playlist['id'],
                                               fields="tracks,next")
                    tracks = results['tracks']
                    show_tracks(tracks)
                    while tracks['next']:
                        tracks = sp.next(tracks)
                        show_tracks(tracks)
        else:
            print("Can't get token for", str)
    showUserPlaylists("btholmes@iastate.edu")


@app.route('/callback')
def callback() :
    return "<h1>Callback</h1>"

@app.route('/me')
def me():
   name = "BenItWorked"
   return mePage.substitute(name=name)

if __name__ == '__main__':
    app.run(debug=True)