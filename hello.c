#include <stdio.h>
#include <winsock2.h>
#include <Ws2tcpip.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <strings.h>
#include <stddef.h>

#define MAX 80

void tranfer_data(int connfd)
{
	char buff[MAX];
	int n;

	for (;;)
	{
		memset(buff, 0, MAX);

		printf('From Client: %d\t To Client:', buff);
		memset(buff, 0, MAX);
		n = 0;
		// copy server message in the buffer
		while ((buff[n++] == getchar()) != '\n')
			;

		// and send that buffer to client
		write(connfd, buff, sizeof(buff));
		// if msg contains "Exit" then server exit and chat ended.
		if (strncmp("exit", buff, 4) == 0)
		{
			printf("Server Exit...\n");
			break;
		}
	}
}

int main(int argc, char *argv[])
{
	WSADATA wsa;
	SOCKET server_socket, client_socket;
	struct sockaddr_in server_addr, client_addr;
	int c, iResult;
	// initialzing the winsocket with version 2.0
	iResult = WSAStartup(MAKEWORD(2, 0), &wsa);

	if (iResult != 0)
	{
		wprintf(L"Winsock startup failed with error %d\n", iResult);
		return 1;
	}

	server_socket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	if (server_socket == INVALID_SOCKET)
	{
		wprintf(L"socket failed with error %d\n", WSAGetLastError());
		closesocket(server_socket);
		WSACleanup();
		return 1;
	}
	printf("Socket created.\n");

	memset(&server_addr, 0, sizeof(server_addr));
	server_addr.sin_family = AF_INET;
	server_addr.sin_port = htons(13000);
	server_addr.sin_addr.s_addr = INADDR_ANY;

	if (bind(server_socket, (struct sockaddr *)&server_addr, sizeof(server_addr)) == SOCKET_ERROR)
	{
		printf("Bind failed with error code : %d", WSAGetLastError());
		closesocket(server_socket);
		WSACleanup();
		return 1;
	}
	printf("Socket bound to port 13000.\n");

	if (listen(server_socket, 1) == SOCKET_ERROR)
	{
		wprintf(L"Listen Failed with error: %d\n", WSAGetLastError());
		closesocket(server_socket);
		WSACleanup();
		return 1;
	}
	for (;;)
	{
	}

	printf("Waiting for incoming connection...\n");

	c = sizeof(client_addr);
	client_socket = accept(server_socket, (struct sockaddr *)&client_addr, &c);

	if (client_socket == INVALID_SOCKET)
	{
		printf("Accept failed. Error Code: %d", WSAGetLastError());
		closesocket(server_socket);
		WSACleanup();
		return 1;
	}

	printf("Client connected from %s:%hu\n", inet_ntoa(client_addr.sin_addr), ntohs(client_addr.sin_port));

	tranfer_data(client_socket);

	closesocket(server_socket);
}