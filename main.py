import socket

print("hi")



HOST = "192.168.1.103"  # The server's hostname or IP address
PORT = 80  # The port used by the server

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))



s.sendall(b"Hello, world")
data = s.recv(1024)

print(f"Received {data!r}")
