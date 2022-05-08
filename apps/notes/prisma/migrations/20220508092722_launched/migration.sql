-- CreateTable
CREATE TABLE "Launch" (
    "id" TEXT NOT NULL,
    "launched" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Launch_pkey" PRIMARY KEY ("id")
);
