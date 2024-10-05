from flask import Flask, jsonify, request

# Crear una instancia de Flask
app = Flask(__name__)

# Definir una ruta con el método POST
@app.route('/hello', methods=['POST'])
def hello_world():
    # Responder con un JSON que diga "Hello World!"
    return jsonify({"message": "Hello World!"})

if __name__ == '__main__':
    # Ejecutar la aplicación en el puerto 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
