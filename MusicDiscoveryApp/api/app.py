import json
import requests
import base64
import os.path
import urllib


from decorator import *
from spotifyCredentials import *
from functions import *

from flask import Flask, request, redirect, render_template, session, send_file
from flask_restful import Resource, Api, reqparse


app = Flask(__name__)
api = Api(app)


# NEED this random whatever string for sessions
app.secret_key = 'AZWSXEDC7654321asdf'


@app.route('/', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def hello():
    # print "****************************************************    in root function " + request.args["myvar"]
    url_args = "&".join(["{}={}".format(key,urllib.quote(val)) for key,val in auth_query_parameters.iteritems()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)

    return redirect(auth_url)

@app.route('/refresh_token', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def refresh():
    tokens = getUserToken()
    tokens = json.loads(tokens)
    refresh_token = tokens['refresh_token']
    access_token = refreshToken(refresh_token)
    return access_token


@app.route("/callback", methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def callback():
    # Auth Step 4: Requests refresh and access tokens
    auth_token = request.args['code']
    # print "auth_token is : " + str(auth_token)
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI
    }
    base64encoded = base64.b64encode("{}:{}".format(CLIENT_ID, CLIENT_SECRET))
    headers = {"Authorization": "Basic {}".format(base64encoded)}
    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload, headers=headers)

    # Auth Step 5: Tokens are Returned to Application
    response_data = json.loads(post_request.text)
    session['access_token'] = response_data["access_token"]
    session['refresh_token'] = response_data["refresh_token"]
    session['token_type'] = response_data["token_type"]
    session['expires_in'] = response_data["expires_in"]

    # STORE user info in a text file so we can reuse it
    storeUserInfo(session['access_token'], session['refresh_token'], session['token_type'], session['expires_in'] )

    return redirect("http://localhost:8000/app/#/callback")


@app.route('/user_info', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def userInfo() :
    # Gets all the user's information to display on the home page
    data = getUserToken()
    data = json.loads(data)
    access_token = data['access_token']
    authorization_header = {"Authorization":"Bearer {}".format(access_token)}

    info_response = requests.get("https://api.spotify.com/v1/me", headers=authorization_header)
    info = json.loads(info_response.text)
    return json.dumps(info)


@app.route('/tracks', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def getTracks() :
    # This method only gets the tracks for the current playlist

    url = request.args['url']


    data = getUserToken()
    data = json.loads(data)
    access_token = data['access_token']
    authorization_header = {"Authorization":"Bearer {}".format(access_token)}
    # playlist_tracks_endpoint = "https://api.spotify.com/v1/users/{}/playlists/{}/tracks".format(user_id, playlist_id)
    tracks_response = requests.get(url, headers=authorization_header)
    # tracks_response = requests.get("https://api.spotify.com/v1/users/spotify_netherlands/playlists/3r8ok7gRfb23XIQTZ3ttOK/tracks", headers=authorization_header)

    tracks = json.loads(tracks_response.text);
    return json.dumps(tracks)

@app.route('/delete_track', methods=['GET', 'POST', 'DELETE', 'OPTIONS'])
@crossdomain(origin='*')
def deleteTrack() :

    urlPlaylistToDeleteFrom = request.args['url']
    track_uri = request.args['uri']
    index = request.args['pos']
    print("in app.py, uri and index is  " + str(track_uri) + "   " + str(index))

    userInfo = getUserToken()
    userInfo = json.loads(userInfo)
    access_token = userInfo['access_token']
    authorization_header = {
        # These are requirements to delete a track
        "Authorization":"Bearer {}".format(access_token) ,
        "Content-Type" : "application/json"
    }
    tracksData = json.dumps({"tracks": [{ "uri" : track_uri, "positions": [int(index)] }] })
    delete_response = requests.delete(urlPlaylistToDeleteFrom, headers=authorization_header, data=tracksData)

    deleteObj = json.loads(delete_response.text)
    return json.dumps(deleteObj)


@app.route('/playlists', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def getPlaylists():
    if not checkCredentials() :
        return ""
    # Get Header
    data = getUserToken()
    data = json.loads(data)
    access_token = data['access_token']
    authorization_header = {"Authorization":"Bearer {}".format(access_token)}

    # Get profile data
    user_profile_api_endpoint = "{}/me".format(SPOTIFY_API_URL)
    profile_response = requests.get(user_profile_api_endpoint, headers=authorization_header)
    profile_data = json.loads(profile_response.text)

    return json.dumps(getUserPlaylists(profile_data, authorization_header, 50, 0))

@app.route('/discover_all', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def discoverAll():
    # Get Header
    allData = []
    count = 0;
    ArtistDict = {}
    data = getUserToken()
    data = json.loads(data)
    access_token = data['access_token']
    authorization_header = {"Authorization":"Bearer {}".format(access_token)}
    query_params = {
        'limit' : 50,
        'offset' : count
    }
    get_request = requests.get("https://api.spotify.com/v1/me/tracks", data=query_params, headers=authorization_header)
    tracks = json.loads(get_request.text)
    tracks = tracks['items']
    allData.append(tracks)
    total = tracks['total']
    count += 50

    # while count < total :
    #     query_params = {
    #         'limit' : 50,
    #         'offset' : count
    #     }
    #     get_request = requests.get("https://api.spotify.com/v1/me/tracks", data=query_params, headers=authorization_header)
    #     tracks = json.loads(get_request.text)
    #     tracks = tracks['items']
    #     allData.append(tracks)
    #     count += 50

    # return len(allData)
    return "test"



@app.route('/add_playlist', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def addPlaylist():
    name = request.args['name']
    public = request.args['public']
    collaborative = request.args['collaborative']
    href = request.args['href']
    href = href + "/playlists"

    # Get Header
    data = getUserToken()
    data = json.loads(data)
    access_token = data['access_token']
    authorization_header = {
        # These are requirements to delete a track
        "Authorization":"Bearer {}".format(access_token) ,
        "Content-Type" : "application/json"
    }

    body_data = json.dumps({ "name" : name, "public" : True, "collaborative" : False })

    response = requests.post(href, headers=authorization_header, data=body_data)
    responseObj = json.loads(response.text);
    return json.dumps(responseObj)



@app.route('/logout', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain(origin='*')
def logout():
    eraseCredentials()
    return redirect("http://localhost:8000/app/#/home")



@app.route('/testInfo',  methods=['POST', 'GET', 'OPTIONS'])
@crossdomain(origin='*')
def info():
    # var = session['access_token']
    var = "hey"
    return "<h1>you found test info</h1> " + str(var)

if __name__ == "__main__":
    app.debug = True  # Comment this out when going into production
    app.run(host='0.0.0.0', port=5001)



