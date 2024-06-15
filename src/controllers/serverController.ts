import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import PlayerTracker from "../utils/playerTracker";

export const addServer = async (req: Request, res: Response) => {
  const { ip, port } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const server = await prisma.server.create({
      data: { ip, port, userId },
    });
    res.status(201).json(server);
  } catch (error) {
    res.status(400).json({ error: "Error adding server" });
  }
};

export const trackServer = async (req: Request, res: Response) => {
  const servers = await prisma.server.findMany();

  for (const server of servers) {
    const tracker = new PlayerTracker(server.ip, server.port);
    try {
      const playersCount = await tracker.getPlayersCount();
      console.log("playersCount", playersCount);

      const updateResult = await prisma.server.update({
        where: { id: server.id },
        data: { playersCount },
      });

      console.log(`Server ${server.id} updated with ${playersCount} players`);
      console.log("Update result:", updateResult);
    } catch (error) {
      console.log(
        `Error connecting to server ${server.ip}:${server.port}`,
        error
      );
    }
  }
  res.json({ message: "Tracking complete" });
};

export const getServers = async (req: Request, res: Response) => {
  const servers = await prisma.server.findMany();
  res.json(servers);
};
