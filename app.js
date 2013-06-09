var express = require('express')
  , app = express()
  , sys = require('sys')
  , exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout); console.log(stdout); }

app.use(express.bodyParser());
app.post('/say', function(req, res) {
  var text = req.param("text", "");
  exec("echo '" + escape(text) + "' | espeak -s 120 2>/dev/null", puts);
  var body = '';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

var port = 8000;
app.listen(port, "0.0.0.0");
console.log("Listening on port", port);
