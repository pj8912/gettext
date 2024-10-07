from flask import Flask, request, jsonify
from flask_cors import CORS
import newspaper
import time

app = Flask(__name__)
CORS(app)

@app.route('/siteurl', methods=['POST'])
def analyze_url():
    data = request.json
    url = data.get('url')
    article = newspaper.article(url)
     
    # Here you would typically do some analysis on the URL
    # For this example, we'll just return a simple message
    #    response = f"The URL {url} has been analyzed."
    time.sleep(3)
    return jsonify({"response": article.text})

if __name__ == '__main__':
    app.run(debug=True)
