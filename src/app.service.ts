import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hidden White Text</title>
    <style>
        body {
            background-color: white;
            color: white;
            font-family: monospace;
        }

        ::selection {
            background: white;
            color: white;
        }

        /* For Firefox */
        ::-moz-selection {
            background: white;
            color: white;
        }
    </style>
</head>
<body>

<pre>
public class Server {
    public static void main(String[] args) {
        try {
            System.out.println("Waiting For Client Request");
            ServerSocket ss = new ServerSocket(9806);
            Socket soc = ss.accept();
            System.out.println("Connection Established");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

public class Client {
    public static void main(String[] args) {
        System.out.println("Client Started");
        try {
            Socket soc = new Socket("localhost", 9806);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

 package NetworkProgrammingEX02;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
    public static void main(String[] args) throws IOException {
        String clientSentence;
        String capitalizeSentence;
        System.out.println("Waiting for Client");

        ServerSocket welcomeSocket = new ServerSocket(9806);

        while(true){
            Socket connectionSocket = welcomeSocket.accept();
            System.out.println("Connection Established");

            System.out.println("Getting Client Data");

            BufferedReader informClient = new BufferedReader(new InputStreamReader(connectionSocket.getInputStream()));
            DataOutputStream outClient = new DataOutputStream(connectionSocket.getOutputStream());

            clientSentence = informClient.readLine();
            capitalizeSentence = clientSentence.toUpperCase()+ "\n";
            outClient.writeBytes(capitalizeSentence);

        }

    }
}

package NetworkProgrammingEX02;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

public class Client {
    public static void main(String[] args) throws IOException {
        String sentence ;
        String modifysentence;

        BufferedReader informUser = new BufferedReader(new InputStreamReader(System.in));
        Socket clientSocket = new Socket("localhost", 9806);

        System.out.println("Enter Sentence :");

        DataOutputStream outServere = new DataOutputStream(clientSocket.getOutputStream());
        BufferedReader informServer = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

        sentence = informUser.readLine();
        outServere.writeBytes(sentence+'\n');
        modifysentence = informServer.readLine();
        System.out.println("From Server :"+modifysentence);
        clientSocket.close();

    }
}


package RMI;

    //Service
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface MathService extends Remote {
    public int add(int a , int b) throws RemoteException;
    public int substract(int a, int b)throws RemoteException;
    public int multiply(int a, int b)throws RemoteException;
    public int divide(int a, int b)throws RemoteException;


}

    //Server
package RMI;

import java.rmi.AccessException;
import java.rmi.AlreadyBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class MathServer extends UnicastRemoteObject implements MathService {

    public MathServer() throws RemoteException {
        super();
    }

    @Override
    public int add(int a, int b) throws RemoteException {
        System.out.println("Adding " + a + " + " + b + " in the server");
        return a + b;
    }

    @Override
    public int substract(int a, int b) throws RemoteException {
        System.out.println("Subtracting " + a + " - " + b + " in the server");
        return a - b;
    }

    @Override
    public int multiply(int a, int b) throws RemoteException {
        System.out.println("Multiplying " + a + " * " + b + " in the server");
        return a * b;
    }

    @Override
    public int divide(int a, int b) throws RemoteException {
        System.out.println("Dividing " + a + " / " + b + " in the server");
        return a / b;
    }

    public static void main(String[] args) {
        try {
            MathServer svr = new MathServer();
            Registry registry = LocateRegistry.createRegistry(1099); // Start registry if not running
            registry.bind("CalculatorService", svr);
            System.out.println("Service Started");
        } catch (AlreadyBoundException | RemoteException e) {
            throw new RuntimeException(e);
        }
    }
}

    //Client
package RMI;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;

public class MathClient {
    public static void main(String[] args) {

        try {
            MathService service = (MathService) Naming.lookup("//localhost/CalculatorService");
            System.out.println("Add: " + service.add(2, 2));
            System.out.println("Subtract: " + service.substract(5, 2));
            System.out.println("Multiply: " + service.multiply(2, 2));
            System.out.println("Divide: " + service.divide(20, 2));

        } catch (MalformedURLException | NotBoundException | RemoteException e) {
            e.printStackTrace();
        }
    }
}

    //Grant

grant{
permission java.security.AllPermission;
};



//thread
    package ThereadExample02;

import Thread.Example01.TestTread;

public class ThreadDemo {
    public static void main(String[] args) {

        TestTread testTread = new TestTread();
        Thread thread = new Thread(testTread);
        thread.start();

        for (int i=0 ; i<100 ; i++){
            System.out.println("Main Thread : "+i);
        }
    }
}


    package ThereadExample02;

public class ThreadTest implements Runnable {

    @Override
    public void run() {
        for (int j=0 ; j<100 ; j++){
            System.out.println("Main Thread : "+j);
        }
    }
}

</pre>

</body>
</html>`
  }
}
