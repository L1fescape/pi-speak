var express = require('express')
  , app = express()
  , sys = require('sys')
  , exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout); }

app.use(express.bodyParser());
app.post('/say', function(req, res) {
  // get the text we want spoken
  var text = req.param('text', '');
  text = escape(text);
  text = text.replace(/%20/g, " ");

  // grab the speed at which it should be said
  var speed = req.param('speed', 120);
  speed = escape(speed);

  // talk sweet to me baby
  exec("echo '" + text + "' | espeak -s " + speed + " 2>/dev/null", puts);

  // return an empty response
  var body = '';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

var port = 8000;
app.listen(port, "0.0.0.0");
console.log("Listening on port", port);
