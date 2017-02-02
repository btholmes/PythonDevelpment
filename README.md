# Python Development Club
 * Resources
  * codingbat.com (Click Python tab) 
  * hackerrank.com (Click Python tab) 
	
## WEEK 1
 * Problems https://www.hackerrank.com/domains/python/py-introduction
 * Solutions https://github.com/arsho/Hackerrank_Python_Domain_Solutions/tree/master/Introduction
 
## POSITIONS FOR ELECTIONS 
1. Campus Liaison
2. Webmaster
3. Lead Developer
4. Developer
5. Lead Unix Developer     
6. GitHub Master
7. Event Coordinator 
8. Philanthropy

## WEEK 2
 * Download PyCharm IDE https://www.jetbrains.com/pycharm/download/

 * GITHUB COMMANDS 
  * git clone github.com/username/repository  (This will store a copy of the Github repository on your local machine) 
	
	
  * NOW LETS CREATE AND EDIT OUR OWN REPOSITORY
  * Make the repository on github Repositories-new
  * git clone yourRepository
  * cd into yourRepository
  * touch example.txt
  * open example.txt (Write something in the file) 
  * git add .
  * git commit -m "Message" 
  * git push origin master
	
## WEEK 3
 * At this point should have python, python virtualenv and nodeJS installed on computer

 * Create app on developer.spotify.com 
    Use the clientID and client Secret to operate the API 

 * Tools for learning how to build flask apps 
    [click here](http://file.allitebooks.com/20150530/Flask%20Web%20Development.pdf)
    
 * This week we revised the spotipy directory, and added the SpotifyFlaskBoiler directory
  * spotipy directory
    This contains working code for a web app running with nodeJS and an expressJS server. It doesn't 
    actually contain any Python code, but provides some insight into using the spotify API. 
    All the code contains comments, so it should be easy to follow. 
    Make sure Python, and nodeJS are installed, then.

    git clone https://github.com/btholmes/PythonDevelpment.git
    cd spotipy 
    sudo npm install 
    
    **Now we need to set our ClientID, secret, and redirect ID (get these from developer.spotify website)** 
    export SPOTIPY_CLIENT_ID='96b5706aae2a49989ed8c0c8ae57004e'
    export SPOTIPY_CLIENT_SECRET='6d2af12564b34d76b8602fdabf27da89'
    export SPOTIPY_REDIRECT_URI='http://localhost:8888/callback'

  * From here you can just play around try: 
    practice.py contains python code for contacting the Spotify API 
    
  * If you want to run the NodeJS web app 
    cd authorization_code 
    node app.js (this starts the server) 
    open browser and go to localhost:8888
    Log in, then click the 'show playlist' button to see your spotify playlist 

  * If you want to see the Flask Boiler 
    cd SpotifyFlaskBoiler
    source venv/bin/activate (start the virtual env) 
    python app.py 
    open browser and go to localhost:5000
    **Should see all JSON response from Spotify API**
    This resonse contains 50 of your saved music items from Spotify 
    just run deactivate to stop the virtual env 




