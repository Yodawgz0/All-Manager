import socket
from threading import Thread
from time import sleep
from flask import Flask, jsonify, request
import json
from flask_cors import CORS
import base64
from PIL import Image
import io
from PIL import Image
from pytesseract import pytesseract


connectionestd = True
hostname=socket.gethostname()   
IPAddr=socket.gethostbyname(hostname)   

with open('./dataStore.json', 'r+') as f:
    mainData = json.load(f)
    mainData["mainData"]["IPAddr"]= "http://"+str(IPAddr)+":5000/"
    f.seek(0)
    json.dump(mainData,f, indent=4)


app = Flask(__name__)
CORS(app)
@app.route('/', methods = ['GET', 'POST'])
def request_handler():
    if(request.method == 'GET'):
        data = "Connection is Established"
        return jsonify({'data': data})
    if(request.method == 'POST'):
        data = request.json
        
        if "validatePin" in data:
            if data["validatePin"] == "123456":
                print("PIN correct was Sent")
                return jsonify({'PIN': "Correct"})
            else:
                print("PIN Wrong was Sent")
                return jsonify({'PIN': "Wrong"})
        img = Image.open(io.BytesIO(base64.decodebytes(bytes(str(data["photo"]), "utf-8"))))
        img.save('TextReadingImage.jpg')
        print("Image is saved! as TextReadingImage.jpg\n")
        img = Image.open('TextReadingImage.jpg')
        text = pytesseract.image_to_string(img)
        print(text)
       

def TCP_Handler(arg):
    print(">>>>>>>>>>>>> Starting TCP Handler....\n")
    HOST = IPAddr  # The server's hostname or IP address
    PORT = 4000  # The port used by the server

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    while(1):
        try:
            s.connect((HOST, PORT))
        except:
            print("Please Check if the IP is Hosted is not!!\n")
            print("##############CONFIRM###############\n")
            confrm_host = input("Y for checked / N for quit")
            if confrm_host.lower() == 'y':
                continue
            else:
                break
        print(f">>>>>>>>>>>>> Connection estd on the IP {IPAddr}....\n")

        while(connectionestd):
            print(">>>>>>>>>>>>> Sending Data\n")
            s.sendall(b"You are now connected to Python \n")
            data = s.recv(1024)

            print(f">>>>>>>>>>>>> Received {data!r}\n")
            sleep(0.5)


if __name__ == "__main__":

    thread = Thread(target = TCP_Handler, args = (10, ))
    thread.start()
    print("starting API Handler\n")
    app.debug= False
    app.run(IPAddr, port="5000")
    thread.join()
    print("thread finished...exiting\n")
