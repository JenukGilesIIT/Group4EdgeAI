from flask import Flask, request, jsonify

app = Flask(__name__)
global data

# Define the route that will receive the JSON data
@app.route('/receiver-script', methods=['POST'])
def receive_data():
    global data
    # Get the JSON data from the request
    data = request.json

    # Return a response to the sender
    return 'OK'

@app.route('/get_accident_data', methods=['POST'])
def get_accident_data():
    global data

    # Convert data to JSON format and send as a response
    return jsonify(data)

if __name__ == '__main__':
    app.run()


