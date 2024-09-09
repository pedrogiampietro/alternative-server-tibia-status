import SocketConnection from "./socketConnection";
import OutputMessage from "./outputMessage";

class PlayerTracker extends SocketConnection {
  message: Buffer;

  constructor(ip: string, port: number) {
    const buffer = Buffer.from([6, 0, 255, 1, 32, 0, 0, 0]);
    super(ip, port, buffer);
    this.message = buffer;
  }

  async getPlayersCount(): Promise<number> {
    try {
      const message = await this.socketConnect(this.ip, this.port, this.buffer);
      console.log("Received message:", message);

      if (!Buffer.isBuffer(message) || message.length < 5) {
        throw new Error(`Invalid message format or length: ${message}`);
      }

      const output = new OutputMessage(message);
      output.getU16();
      const firstByte = output.getByte();
      console.log("First byte:", firstByte);

      if (firstByte === 33) {
        const playersCount = output.getU32();
        console.log("Players count:", playersCount);
        return playersCount;
      } else {
        throw new Error(`Unexpected first byte in response: ${firstByte}`);
      }
    } catch (error) {
      console.error("Error in getPlayersCount:", error);
      throw error;
    }
  }

  async playerList(): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        const message = new OutputMessage(this.message);
        message.getU16(); // Skip the initial 2 bytes
        const firstByte = message.getByte();

        console.log("First byte in playerList:", firstByte);

        if (firstByte === 33) {
          const playersCount = message.getU32();
          console.log(`Online: ${playersCount} Players`);
          resolve(playersCount);
        } else {
          console.error("Unexpected first byte:", firstByte);
          reject(new Error(`Unexpected first byte: ${firstByte}`));
        }
      } catch (error) {
        console.error("Error in playerList:", error);
        reject(error);
      }
    });
  }

  endSocket() {
    this.client.on("end", async () => {
      try {
        const playersCount = await this.playerList();
        console.log("playersCount", playersCount);
      } catch (error) {
        console.error("Error in endSocket:", error);
      }
    });
  }
}

export default PlayerTracker;
