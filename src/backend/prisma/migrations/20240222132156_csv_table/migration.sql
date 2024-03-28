/*
  Warnings:

  - You are about to drop the `CSVTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CSVTable";

-- CreateTable
CREATE TABLE "CsvTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CsvTable_pkey" PRIMARY KEY ("id")
);
