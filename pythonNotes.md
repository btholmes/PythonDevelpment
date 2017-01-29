# General Notes on Python and Spotify API
 * Guide to different types of loops 
 	http://treyhunner.com/2016/04/how-to-loop-with-indexes-in-python/
	
 * Trouble with installation use link: 
 	https://gist.github.com/patriciogonzalezvivo/77da993b14a48753efda
 * Check version of python 
 	python -V
 * Should have sdk installed at 
 	usr/bin/python 
	
 * To run Python script 
  1. Make sure is executable 
  	chmod +x script.py 
  2. Run command 
  	python script.py
	
## Set up Spotify Credentials
 * Add a saved album .py 
 	 You need to set your Spotify API credentials. You can do this by
            setting environment variables like so:

            export SPOTIPY_CLIENT_ID='96b5706aae2a49989ed8c0c8ae57004e'
            export SPOTIPY_CLIENT_SECRET='6d2af12564b34d76b8602fdabf27da89'
            export SPOTIPY_REDIRECT_URI='http://localhost:8888/callback '

    * If you get the not a valid identifier error 
    	Make sure you don't have any spaces between the = sign. 
            Get your credentials at     
                https://developer.spotify.com/my-applications

## Link to Album uri's and id's spotify
	https://developer.spotify.com/web-api/user-guide/#spotify-uris-and-ids
	
 * Getting past the redirect URI error 
 	https://developer.spotify.com/web-api/tutorial/