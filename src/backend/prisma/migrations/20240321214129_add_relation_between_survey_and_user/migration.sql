/*
  Warnings:

  - Added the required column `userId` to the `SatisfactionSurvey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SatisfactionSurvey" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SatisfactionSurvey" ADD CONSTRAINT "SatisfactionSurvey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
