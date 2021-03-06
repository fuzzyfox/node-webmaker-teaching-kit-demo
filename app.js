var express = require('express'),
    i18n = require('webmaker-i18n'),
    nunjucks = require('nunjucks'),
    path = require('path');

var app = express(),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname, 'views' )), {
      autoescape: false
    });

nunjucksEnv.express( app );

app.use( express.logger());

var supportedLanguages = ['en-US', 'th-TH'];
app.use( i18n.middleware({
  supported_languages: supportedLanguages,
  default_lang: 'en-US',
  translation_directory: path.join( __dirname, 'locale' ),
  mappings: {
    'en': 'en-US',
    'th': 'th-TH'
  }
}));

app.get( "/", function( req, res ) {
  res.render( "iframe.html" );
});

app.get( "/activity", function( req, res ) {
  res.render( "activity.html" );
});
app.get( "/strings/:lang?", i18n.stringsRoute() );

app.listen(8000, function() {
  console.log("Server listening - http://localhost:8000");
});
