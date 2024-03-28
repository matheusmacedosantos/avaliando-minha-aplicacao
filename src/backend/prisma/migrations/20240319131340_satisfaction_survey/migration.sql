-- CreateTable
CREATE TABLE "SatisfactionSurvey" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionsAndAnswers" JSONB NOT NULL,

    CONSTRAINT "SatisfactionSurvey_pkey" PRIMARY KEY ("id")
);
