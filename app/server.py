from flask import render_template
import urllib2


from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
	return render_template("index.html", title="Home")

if __name__ == "__main__":
	app.run()
