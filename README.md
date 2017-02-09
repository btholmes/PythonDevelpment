# Python Development Club
 * Resources
* [coding bat problems](https://codingbat.com) (Click Python tab) 
* [hackerrank problems](https://hackerrank.com) (Click Python tab) 
	
## WEEK 1
* Problems [hackerrank problems](https://www.hackerrank.com/domains/python/py-introduction)
 * Solutions [hackerrank solutions](https://github.com/arsho/Hackerrank_Python_Domain_Solutions/tree/master/Introduction)
 
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


## WEEK 4
 * Today we worked with render_template from the Flask import. 
  * Display html content with variables populated on the fly
     return render_template("index.html", htmlVar1 = newData1, htmlVar2 = newData2, etc..)

 * Example index.html 
		<html>
<!-- Bootstrap Requirements -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<!--                        -->

    <h1 class = "text-primary text-center">My Playlists</h1>

        <p>{{ data }}</p>
        <br>
        {% if image and name and email %}
            <img src = "{{ image }}">
            <p><b>Name : </b>{{ name }}</p>
            <p><b>Email : </b>{{ email }}</p>
        {% endif %}

    {% for item in sorted_array %}
        <div class = "row">
            <div class = "col-md-5">
                <img src = "{{ item['images'][0]['url'] }}">
            </div>
            <div class = "col-md-7">
                <div class = "row">
                    <button onclick = "showTracks()" data = "{{ item.owner.id }}" class = "btn btn-success">
                        View Tracks
                    </button>
                </div>
                <div class = "hide row" id = "{{ item.owner.id }}">
                <br>
                <h4 class = "text-info">Playlist Tracks</h4>
                    <div id = "{{ item.owner.id }}tracks">
    
                    </div>
                </div>
            </div>
        </div>

        <p>{{ item['href'] }}</p>
        <p> {{ item }} </p>

    {% endfor %}

 * Example app.py 

        @app.route('/tracks', methods=['GET', 'POST'])
        def getTracks():
            imgVar = "link"
            nameVar="Music"
            emailVar="username@me.com"
            dateVar="2012-02-32 00-00-0000"
            
            playlist_tracks_endpoint = "https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks".format(user_id="spotify_netherlands",playlist_id="3r8ok7gRfb23XIQTZ3ttOK")
            print "Header is " + authorization_header
            tracks_response = requests.get("URL", headers=headers)
            tracks = json.loads(tracks_response.text);

            return render_template("index.html",sorted_array=tracks["items"], image=imgVar, name=nameVar, email=emailVar, data=dateVar)

