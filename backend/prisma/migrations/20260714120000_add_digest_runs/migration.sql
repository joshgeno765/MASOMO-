-- CreateTable
CREATE TABLE "digest_runs" (
    "id" SERIAL NOT NULL,
    "lastRunAt" TIMESTAMP(3) NOT NULL,
    "newLeadsCount" INTEGER NOT NULL DEFAULT 0,
    "newAppointmentsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "digest_runs_pkey" PRIMARY KEY ("id")
);

