import json
import requests
import os
import base64

from spotifyCredentials import *


def checkCredentials() :
    with open("../userTokens.txt", "r") as text_file :
        content = text_file.read()
    content = json.loads(content)
    return 'access_token' in content


def storeUserInfo(access_token, refresh_token, token_type, expires_in) :
    file = "../userTokens.txt"
    data = {"access_token" : access_token,
            "refresh_token" : refresh_token,
            "token_type" : token_type,
            "expires_in" : expires_in
            }
    with open(file, "w") as text_file:
            text_file.write(json.dumps(data))
    os.chmod(file, 0o777)


def refreshToken(refresh_token) :
    code_payload = {
        "grant_type": "refresh_token",
        "refresh_token" : refresh_token,
        # "code": str(auth_token),
        "redirect_uri": REDIRECT_URI
    }
    base64encoded = base64.b64encode("{}:{}".format(CLIENT_ID, CLIENT_SECRET))
    headers = {"Authorization": "Basic {}".format(base64encoded)}
    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload, headers=headers)

    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]

    return access_token


def getUserToken() :
    path = "../userTokens.txt"
    with open(path, 'r') as content_file:
        content = content_file.read()
    return content

def writeToFile(info, filename, writeOrAppend) :
    file = filename
    with open(file, writeOrAppend) as text_file:
        data = json.dumps(info)
        if(writeOrAppend == "w"):
            text_file.write("{}".format(data[:len(data)-1]))
        else :
            text_file.write(",{}".format(data[1:len(data)-1]))
    os.chmod(file, 0o777)

def eraseCredentials() :
    with open("../userTokens.txt", "w") as text_file:
        text_file.write("")

def getUserTracks(authorization_header, limit, offset) :
    query_params = {
        'limit' : limit,
        'offset' : offset
    }
    tracks_api_endpoint = "https://api.spotify.com/v1/me/tracks"
    tracks_response = requests.get(tracks_api_endpoint, params=query_params, headers=authorization_header)
    tracks_data = json.loads(tracks_response.text)
    return tracks_data["items"] if len(tracks_data["items"]) > 0 else False

def getUserPlaylists(profile_data, authorization_header, limit, offset) :
    playlist_api_endpoint = "{}/playlists".format(profile_data["href"])
    playlists_response = requests.get(playlist_api_endpoint, headers=authorization_header)
    playlist_data = json.loads(playlists_response.text)
    return playlist_data