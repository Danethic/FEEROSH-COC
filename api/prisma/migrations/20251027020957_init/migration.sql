-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "username" TEXT,
    "passwordHash" TEXT,
    "twofaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "profilePhotoUrl" TEXT,
    "teamAssignment" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "energy" INTEGER NOT NULL DEFAULT 0,
    "points" BIGINT NOT NULL DEFAULT 0,
    "hasOneTimeSecondDefense" BOOLEAN NOT NULL DEFAULT true,
    "afkState" BOOLEAN NOT NULL DEFAULT false,
    "afkActiveUntil" TIMESTAMP(3),
    "afkCooldownUntil" TIMESTAMP(3),
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "winnerTeam" INTEGER,
    "prize" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonTeam" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "teamIndex" INTEGER NOT NULL,
    "teamName" TEXT NOT NULL,

    CONSTRAINT "SeasonTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTeamAssignment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "teamIndex" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTeamAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameState" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT,
    "currentPhase" INTEGER NOT NULL DEFAULT 0,
    "phaseChangeCount" BIGINT NOT NULL DEFAULT 0,
    "phaseChangedAt" TIMESTAMP(3),
    "globalEnergy" BIGINT NOT NULL DEFAULT 0,
    "team0Energy" BIGINT NOT NULL DEFAULT 0,
    "team1Energy" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhaseHistory" (
    "id" TEXT NOT NULL,
    "gameStateId" TEXT NOT NULL,
    "fromPhase" INTEGER NOT NULL,
    "toPhase" INTEGER NOT NULL,
    "changedByUserId" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PhaseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPhaseAction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonId" TEXT,
    "phase" INTEGER NOT NULL,
    "actionType" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPhaseAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT,
    "channel" TEXT NOT NULL,
    "senderUserId" TEXT,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "seasonId" TEXT,
    "eventType" TEXT NOT NULL,
    "payload" JSONB,
    "ip" TEXT,
    "userAgent" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Web3Contract" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "network" TEXT NOT NULL DEFAULT 'ethereum',
    "abi" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Web3Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenContractId" TEXT,
    "tokenId" TEXT,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "tokenType" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonTeam_seasonId_teamIndex_key" ON "SeasonTeam"("seasonId", "teamIndex");

-- CreateIndex
CREATE UNIQUE INDEX "UserTeamAssignment_userId_seasonId_key" ON "UserTeamAssignment"("userId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhaseAction_userId_seasonId_phase_actionType_key" ON "UserPhaseAction"("userId", "seasonId", "phase", "actionType");

-- CreateIndex
CREATE UNIQUE INDEX "Web3Contract_name_network_key" ON "Web3Contract"("name", "network");

-- AddForeignKey
ALTER TABLE "SeasonTeam" ADD CONSTRAINT "SeasonTeam_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeamAssignment" ADD CONSTRAINT "UserTeamAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeamAssignment" ADD CONSTRAINT "UserTeamAssignment_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameState" ADD CONSTRAINT "GameState_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhaseHistory" ADD CONSTRAINT "PhaseHistory_gameStateId_fkey" FOREIGN KEY ("gameStateId") REFERENCES "GameState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhaseHistory" ADD CONSTRAINT "PhaseHistory_changedByUserId_fkey" FOREIGN KEY ("changedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhaseAction" ADD CONSTRAINT "UserPhaseAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhaseAction" ADD CONSTRAINT "UserPhaseAction_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityEvent" ADD CONSTRAINT "ActivityEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityEvent" ADD CONSTRAINT "ActivityEvent_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
