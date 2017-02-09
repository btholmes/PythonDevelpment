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

            export SPOTIPY_CLIENT_ID='ID'
            export SPOTIPY_CLIENT_SECRET='Secret'
            export SPOTIPY_REDIRECT_URI='http://localhost:8888/callback '

    * If you get the not a valid identifier error 
    	Make sure you don't have any spaces between the = sign. 
            Get your credentials at     
                https://developer.spotify.com/my-applications

## Link to Album uri's and id's spotify
	https://developer.spotify.com/web-api/user-guide/#spotify-uris-and-ids
	
 * Getting past the redirect URI error 
 	https://developer.spotify.com/web-api/tutorial/

## Flask Mega tutorial link 
    https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world/page/5

## Integration Flask with Angular 
 * Interpolate change for Angular so that Jinja2 won't be effected 

            var app = angular.module('Application', []);

            app.config(['$interpolateProvider', function($interpolateProvider) {
            $interpolateProvider.startSymbol('{a');
            $interpolateProvider.endSymbol('a}');
            }]);'

## Connection refused, socket error, socket already in use
 * lsof -i :5000
 * sudo kill -9 PID (Where PID was returned in the first command) 

## No 'Access-Control-Allow-Origin' header is present on the requested resource. 

 * Add this decorator to script 

            def crossdomain(origin=None, methods=None, headers=None,
            max_age=21600, attach_to_all=True,
            automatic_options=True):
            if methods is not None:
            methods = ', '.join(sorted(x.upper() for x in methods))
            if headers is not None and not isinstance(headers, basestring):
            headers = ', '.join(x.upper() for x in headers)
            if not isinstance(origin, basestring):
            origin = ', '.join(origin)
            if isinstance(max_age, timedelta):
            max_age = max_age.total_seconds()

            def get_methods():
            if methods is not None:
            return methods

            options_resp = current_app.make_default_options_response()
                return options_resp.headers['allow']

            def decorator(f):
            def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
            resp = current_app.make_default_options_response()
            else:
            resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
            return resp

            h = resp.headers
            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Headers'] = \
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            if headers is not None:
            h['Access-Control-Allow-Headers'] = headers
            return resp

            f.provide_automatic_options = False
            return update_wrapper(wrapped_function, f)
            return decorator

 * Then use it like 

            @app.route('/testInfo',  methods=['POST', 'GET', 'OPTIONS'])
            @crossdomain(origin='*')
            def info():
            return "<h1>you found test info</h1>"

 * Also make sure in app.run, you have host=0.0.0.0

            if __name__ == "__main__":
            app.debug = True  # Comment this out when going into production
            app.run(host='0.0.0.0', port=5001)


