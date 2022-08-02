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


connectionestd = True
hostname=socket.gethostname()   
IPAddr=socket.gethostbyname(hostname)

global_process_list = []

with open('./dataStore.json', 'r+') as f:
    mainData = json.load(f)
    mainData["mainData"]["IPAddr"]= "http://"+str(IPAddr)+":5000/"
    f.seek(0)
    json.dump(mainData,f, indent=4)


app = Flask(__name__)
CORS(app)
@app.route('/', methods = ['GET', 'POST'])
def request_handler():
    global global_process_list
    
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
        
        global_process_list.append(["image",data["photo"]])
        return jsonify("Image is saved! as TextReadingImage.jpg \nBeing sent to PC.....\n")
        

def TCP_Handler(arg):
    global global_process_list

    
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
        print(">>>>>>>>>>>>> Sending Data\n")
        #s.sendall(b"You are now connected to Python")
        s.sendall(b"ImageRecv")
        data = s.recv(1024)
        print(f">>>>>>>>>>>>> Received {data!r}\n")
        

        while(connectionestd):
            print("Waiting for Data....\n")
            if(len(global_process_list)>0):
                data_process = global_process_list[0][0]
                if data_process == "image":
                    print(">>>>>>>>>>>>> Sending Image to PC")
                    s.sendall(b'ImageRecv')
                    data_verify_forImage = s.recv(1024)
                    print(f">>>>>>>>>>>>> Received {data!r}\n")
                    if data_verify_forImage == b'SendImage':
                        s.sendall(global_process_list[0][0])
                    else:
                        print(">>>>>>>>>>>>> Retry Sending the Image from Server")
                        continue
                    data_verify_forImage = s.recv(1024)
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
