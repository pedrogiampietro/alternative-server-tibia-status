-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Server" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "playersCount" INTEGER,
    "country" TEXT NOT NULL,
    "serverName" TEXT NOT NULL,
    "uptime" TEXT NOT NULL,
    "pts" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    CONSTRAINT "Server_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
