/*
  Warnings:

  - You are about to drop the column `hash` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_hash_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hash";
