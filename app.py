from flask import Flask, jsonify, render_template
from data import pipelines, services, team

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", pipelines=pipelines, services=services, team=team)

@app.route("/api/pipelines")
def api_pipelines():
    return jsonify(pipelines)

@app.route("/api/services")
def api_services():
    return jsonify(services)

@app.route("/api/team")
def api_team():
    return jsonify(team)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
