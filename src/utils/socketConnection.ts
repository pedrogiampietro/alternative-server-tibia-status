import net from "net";

class SocketConnection {
  protected client: net.Socket;
  protected ip: string;
  protected port: number;
  protected buffer: Buffer;

  constructor(ip: string, port: number, buffer: Buffer) {
    this.ip = ip;
    this.port = port;
    this.buffer = buffer;
    this.client = new net.Socket();
  }

  socketConnect(ip: string, port: number, buffer: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.client.connect(port, ip, () => {
        this.client.write(buffer);
      });

      this.client.on("data", (data) => {
        resolve(data);
        this.client.destroy(); // close the connection
      });

      this.client.on("error", (error) => {
        reject(error);
      });

      this.client.on("close", () => {
        console.log("Connection closed");
      });
    });
  }
}

export default SocketConnection;
