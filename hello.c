#include <stdio.h>
#include <winsock2.h>

#pragma comment(lib, "ws2_32.lib") // Winsock Library

int main(int argc, char *argv[])
{
	WSADATA wsa;
	SOCKET s, new_socket;
	struct sockaddr_in server, client;
	int c, ipconfirm, connectionSuccess = 0;
	char *message, ipadrrFinal[20], server_reply[12];
	int recv_size;

	while (1)
	{
		printf("Enter the IP address you want to Host : \n");
		gets(ipadrrFinal);
		printf("The Entered IP is %s\n", ipadrrFinal);
		printf("Do you want to change it? press and key for yes and 0 for No\n");
		scanf("%d", &ipconfirm);
		if (ipconfirm == 0)
		{
			continue;
		}
		else
		{
			printf("%s\n", ipadrrFinal);
			break;
		}
	}

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
	server.sin_addr.s_addr = inet_addr(ipadrrFinal);
	server.sin_port = htons(80);

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
		puts("Connection accepted");

		while (connectionSuccess == 0)
		{
			if ((recv_size = recv(s, server_reply, 12, 0)) == SOCKET_ERROR)
			{
				puts("recv failed");
				closesocket(s);
				WSACleanup();
				return 1;
			}
			puts("Reply received\n");

			message = "You are now connected to the Laptop , What is going to be your Next Move!! \n";
			send(new_socket, message, strlen(message), 0);

			// Add a NULL terminating character to make it a proper string before printing
			server_reply[recv_size] = '\0';
			puts(server_reply);
			connectionSuccess = 1;
		}
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