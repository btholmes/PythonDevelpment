import spotipy
import json
import requests
import base64
import urllib
import sys
import spotipy.util as util

from flask import Flask, request, redirect, render_template
from string import Template
app = Flask(__name__)


#  Client Keys
CLIENT_ID = "96b5706aae2a49989ed8c0c8ae57004e"
CLIENT_SECRET = "fb4c0a64cb074b25bcb28a4787c4007b"

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)


# Server-side Parameters
CLIENT_SIDE_URL = "http://127.0.0.1"
PORT = 5000
REDIRECT_URI = "{}:{}/callback".format(CLIENT_SIDE_URL, PORT)
SCOPE = "playlist-modify-public playlist-modify-private"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    # "state": STATE,
    # "show_dialog": SHOW_DIALOG_str,
    "client_id": CLIENT_ID
}


authorization_header = "";

@app.route('/')
def hello():
    url_args = "&".join(["{}={}".format(key,urllib.quote(val)) for key,val in auth_query_parameters.iteritems()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return redirect(auth_url)



@app.route("/callback")
def callback():

    # Auth Step 4: Requests refresh and access tokens
    auth_token = request.args['code']
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
    access_token = response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    # Auth Step 6: Use the access token to access Spotify API
    authorization_header = {"Authorization":"Bearer {}".format(access_token)}

    # Get profile data
    user_profile_api_endpoint = "{}/me".format(SPOTIFY_API_URL)
    profile_response = requests.get(user_profile_api_endpoint, headers=authorization_header)
    profile_data = json.loads(profile_response.text)

    # Get user playlist data
    playlist_api_endpoint = "{}/playlists".format(profile_data["href"])
    playlists_response = requests.get(playlist_api_endpoint, headers=authorization_header)
    playlist_data = json.loads(playlists_response.text)

    # Combine profile and playlist data to display
    # display_arr = [profile_data] + playlist_data["items"]


    profileImage = profile_data['images'][0]['url']
    profileName = profile_data['display_name']
    profileEmail = profile_data['email']



    return render_template("index.html",sorted_array=playlist_data["items"], image=profileImage, name=profileName, email=profileEmail, data=profile_data)

@app.route('/tracks', methods=['GET', 'POST'])
def getTracks():
    playlist_tracks_endpoint = "https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks".format(user_id="spotify_netherlands",playlist_id="3r8ok7gRfb23XIQTZ3ttOK")
    print "Header is " + authorization_header
    tracks_response = requests.get("https://api.spotify.com/v1/users/spotify_netherlands/playlists/3r8ok7gRfb23XIQTZ3ttOK/tracks", headers=authorization_header)
    tracks = json.loads(tracks_response.text);
    return json.dumps(tracks);


if __name__ == '__main__':
    app.run(debug=True, port=PORT)