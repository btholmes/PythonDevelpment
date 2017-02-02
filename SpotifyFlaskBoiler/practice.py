import spotipy
import sys
import spotipy.util as util



def getTracks(str) :
    sp = spotipy.Spotify()
    results = sp.search(q=str, limit=50)
    for i, t in enumerate(results['tracks']['items']):
        print i, t['name']



def showAlbums(str) :
    birdy_uri = str
    spotify = spotipy.Spotify()

    results = spotify.artist_albums(birdy_uri, album_type='album')
    albums = results['items']
    while results['next']:
        results = spotify.next(results)
        albums.extend(results['items'])

    for album in albums:
        print album['name']

def getArtistImage(str) :
    spotify = spotipy.Spotify()

    # if len(sys.argv) > 1:
    #     name = ' '.join(sys.argv[1:])
    # else:
    #     name = 'Radiohead'

    results = spotify.search(q='artist:' + str, type='artist')
    items = results['artists']['items']
    if len(items) > 0:
        artist = items[0]
        print artist['name'], artist['images'][0]['url']


# First have to set credentials
# export SPOTIPY_CLIENT_ID='96b5706aae2a49989ed8c0c8ae57004e'
# export SPOTIPY_CLIENT_SECRET='6d2af12564b34d76b8602fdabf27da89'
# export SPOTIPY_REDIRECT_URI='http://localhost:8888/callback'

def userSavedTracks(str) :
    scope = 'user-library-read'

    # if len(sys.argv) > 1:
    #     username = sys.argv[1]
    # else:
    #     print "Usage: %s username" % (sys.argv[0],)
    #     sys.exit()

    token = util.prompt_for_user_token(str, scope)

    if token:
        sp = spotipy.Spotify(auth=token)
        results = sp.current_user_saved_tracks()
        for item in results['items']:
            track = item['track']
            print track['name'] + ' - ' + track['artists'][0]['name']
    else:
        print "Can't get token for", str

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


def getArtistInfo(str) :
    spotify = spotipy.Spotify()
    results = spotify.search(q='artist:' + str, type='artist')
    array = []
    for item in results['artists']['items'] :
        array.append(item['uri'])
        # print item['uri'] ,'\n'
    return array


def main() :
    # artistURI = getArtistInfo("Red Hot Chili Peppers")
    getTracks("Red Hot Chili Peppers")
    # showAlbums(artistURI[0])
    # getArtistImage("Red Hot Chili Peppers")
    # userSavedTracks("btholmes@iastate.edu")
    # showUserPlaylists("btholmes@iastate.edu")

if __name__ == "__main__" :
    main()