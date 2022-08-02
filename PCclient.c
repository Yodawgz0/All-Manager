#include <stdio.h>
#include <winsock2.h>
#include <stdlib.h>
#include <string.h>

#pragma comment(lib, "ws2_32.lib") // Winsock Library

char *findIp()
{
	WORD wVersionRequested;
	WSADATA wsaData;
	char caHostname[255 + 1];
	PHOSTENT hostData;
	char *pIP;
	int i = 0;

	wVersionRequested = MAKEWORD(1, 1);

	if (WSAStartup(wVersionRequested, &wsaData) != 0)
	{
		printf("Error......code is not compartible with platform\n");
		exit(EXIT_FAILURE);
	}

	if (gethostname(caHostname, sizeof caHostname) != 0)
	{
		printf("Error......Hostname not found\n");
		printf("HOSTNAME : %s\n", caHostname);
	}
	if ((hostData = gethostbyname(caHostname)) == NULL)
	{
		printf("Error......code is not compartible with platform\n");
		exit(EXIT_FAILURE);
	}

	while (hostData->h_addr_list[i])
	{
		pIP = inet_ntoa(*(struct in_addr *)hostData->h_addr_list[i]);
		printf("The Auto Set IP ADDRESS %d: %s\n", ++i, pIP);
	}

	return pIP;
}

int main(int argc, char *argv[])
{
	WSADATA wsa;
	SOCKET s, new_socket;
	struct sockaddr_in server, client;
	int c, ipconfirm, connectionSuccess = 0;
	char *message, server_reply[2000];
	char ipadrrFinal[20];
	int recv_size;

	printf("Detecting the IP.....\n");
	char *pIP = findIp();

	printf("\nInitialising Winsock...");
	if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
	{
		printf("Failed. Error Code : %d", WSAGetLastError());
		WSACleanup();
		return 1;
	}
	printf("Initialised.\n");

	if ((s = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET)
	{
		printf("Could not create socket : %d", WSAGetLastError());
		WSACleanup();
		return 1;
	}
	printf("Socket created.\n");

	server.sin_family = AF_INET;
	server.sin_addr.s_addr = inet_addr(pIP);
	server.sin_port = htons(4000);

	if (bind(s, (struct sockaddr *)&server, sizeof(server)) == SOCKET_ERROR)
	{
		printf("Bind failed with error code : %d", WSAGetLastError());
		WSACleanup();
		return 1;
	}

	puts("Bind done");

	listen(s, 3);
	printf("Waiting for incoming connections on IP %s ...\n", inet_ntoa(server.sin_addr));

	c = sizeof(struct sockaddr_in);
	while ((new_socket = accept(s, (struct sockaddr *)&client, &c)) != INVALID_SOCKET)
	{
		puts("Message Recvd.....");
		if (recv(new_socket, server_reply, 2000, 0) < 0)
		{
			printf("Recv failed with error code : %d", WSAGetLastError());
			closesocket(s);
			WSACleanup();
			return 1;
		}
		printf("%s\n", server_reply);
		if (server_reply == "ImageRecv")
		{

			send(new_socket, "SendImage", strlen(message), 0);
		}
		// printf("%s\n", server_reply);
		message = "You are now connected to the Laptop , What is going to be your Next Move!! \n";
		send(new_socket, message, strlen(message), 0);
	}

	if (new_socket == INVALID_SOCKET)
	{
		printf("accept failed with error code : %d", WSAGetLastError());
		closesocket(s);
		WSACleanup();
		return 1;
	}

	closesocket(s);
	WSACleanup();

	return 0;
}