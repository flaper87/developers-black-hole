# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Flavio Percoco'
SITENAME = u'Developer\'s black hole'
SITEURL = 'http://localhost:8000'
#GOOGLE_ANALYTICS = 'UA-54541847-1'

PATH = 'content'
THEME = './theme'

STATIC_PATHS = ['images']
EXTRA_PATH_METADATA = {}

TIMEZONE = 'Europe/Rome'

DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom.xml'
TAG_FEED_ATOM = 'feeds/%s.atom.xml'
TRANSLATION_FEED_ATOM = None

# Social widget
SOCIAL = (('twitter', 'http://twitter.com/flaper87'),)
TWITTER_USERNAME = "flaper87"

DEFAULT_PAGINATION = 5
TYPOGRIFY = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
