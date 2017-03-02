#!/usr/bin/env python

#    Copyright 2013 AlchemyAPI
#   This code is a customized subset from code here: #   http://www.alchemyapi.com/developers/getting-started-guide/using-alchemyapi-with-python#clone-sdk 
#   Developed as part of an introductory learning module  www.dreamtolearn.com

from __future__ import print_function
from alchemyapi import AlchemyAPI
import json

#demo_text = 'Dream to Learn brings people together around a shared dream or goal. Todays student may be tomorrows teacher. Distant dreams can become reality when kindred spirits share a goal and support each other.'
 #demo_url = 'http://www.npr.org/2013/11/26/247336038/dont-stuff-the-turkey-and-other-tips-from-americas-test-kitchen'
 #demo_url = 'https://dreamtolearn.com/content/about.html'
#demo_html = '<html><head><title>Python Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>'
#image_url = 'http://demo1.alchemyapi.com/images/vision/football.jpg'
#image_url = 'https://dreamtolearn.com/internal/doc-asset/TPSH5N2R5BTR5QPU2QHVO6SY/Lucy_and_Julia.jpg'
#image_url = 'https://dreamtolearn.com/static/img/aspirational.jpg'
#image_url = 'http://www.plumbingproducts.com/images/pp-leaky-toilet.jpg'
#image_url = 'http://www.thepetmatchmaker.com/wp-content/uploads/2014/08/cats-in-sunglasses3-1.jpg'
#image_url ='http://www.purtonvets.co.uk/communities/8/004/011/970/238//images/4600405359_402x273.png'
#image_url ='http://rgmag.com/wp-content/uploads/2015/03/clouds.jpg'
#image_url = 'http://images.wisegeek.com/polar-bear.jpg'
#image_url = 'http://serbiandentaltourism.com/wp-content/uploads/2015/01/WhitenTeeth.jpg'
image_url = 'http://static.guim.co.uk/sys-images/Arts/Arts_/Pictures/2009/3/31/1238515405719/Brown-bear-001.jpg'

test_text = 'Bob broke my heart, and then made up this silly sentence to test the PHP SDK'
test_html = '<html><head><title>The best SDK Test | AlchemyAPI</title></head><body><h1>Hello World!</h1><p>My favorite language is PHP</p></body></html>'
test_url = 'http://www.nytimes.com/2013/07/13/us/politics/a-day-of-friction-notable-even-for-a-fractious-congress.html?_r=0'
test_jpg = 'pigeon.jpg'


# Create the AlchemyAPI Object
alchemyapi = AlchemyAPI()

print('############################################')
print('#   Image Extraction Example               #')
print('############################################')
print('Processing url: ', image_url)

#### IMAGE TAGGING
response = alchemyapi.imageTagging('url', image_url)
if response['status'] == 'OK':
    print('## Keywords ##')
    for keyword in response['imageKeywords']:
        print(keyword['text'], ' : ', keyword['score'])
    print('')
else:
    print('Error in image tagging call: ', response['statusInfo'])
    
# Sentiment
print('Checking sentiment . . . ')
# response = alchemyapi.sentiment('text', test_text)
response = alchemyapi.sentiment('url', test_url)
if response['status'] == 'OK': 
# 	print(json.dumps(response))
    print(response['docSentiment']['type'])
#     print('')
	
# response = alchemyapi.sentiment('html', test_html)
# assert(response['status'] == 'OK')
# response = alchemyapi.sentiment('url', test_url)

