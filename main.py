from ast import arg
from curses import flash
import socket
from threading import Thread
from time import sleep
from flask import Flask, jsonify, request


def TCP_Handler(arg):

    HOST = "192.168.1.103"  # The server's hostname or IP address
    PORT = 80  # The port used by the server

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))



    s.sendall(b"Hello, world")
    data = s.recv(1024)

    print(f"Received {data!r}")
    
def API_Handler(arg):
    app = Flask(__name__)
    @app.route('/', methods = ['GET', 'POST'])
    def request_handler():
        if(request.method == 'GET'):
    
            data = "hello world"
            return jsonify({'data': data})
    


if __name__ == "__main__":
    thread = Thread(target = TCP_Handler, args = (10, ))
    thread = Thread(target = API_Handler, args = (10, ))
    thread.start()
    thread.start()
    thread.join()
    thread.join()
    print("thread finished...exiting")