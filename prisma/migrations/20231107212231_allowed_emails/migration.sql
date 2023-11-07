-- CreateTable
CREATE TABLE "AllowedEmails" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "AllowedEmails_pkey" PRIMARY KEY ("id")
);
