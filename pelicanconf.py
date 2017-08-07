# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import os

AUTHOR = u'Flavio Percoco'
SITENAME = u'Developer\'s black hole'
SITEURL = os.environ.get('SITEURL', 'https://blog.flaper87.com')
#GOOGLE_ANALYTICS = 'UA-54541847-1'

PATH = 'content'
THEME = './theme/flaper87'

STATIC_PATHS = ['images']
EXTRA_PATH_METADATA = {}

TIMEZONE = 'Europe/Rome'

DEFAULT_LANG = u'en'

MARKDOWN = {
    'output_format': 'html5',
}

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom.xml'
TAG_FEED_ATOM = 'feeds/%s.atom.xml'
TRANSLATION_FEED_ATOM = None

# Social widget
SOCIAL = (('twitter', 'http://twitter.com/flaper87'),)
TWITTER_USERNAME = "flaper87"

DEFAULT_PAGINATION = 5
TYPOGRIFY = False

PLUGIN_PATHS = [os.path.join(os.path.dirname(__file__), 'pelican-plugins')]
PLUGINS = [
    'liquid_tags.youtube',
]

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
