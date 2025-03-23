-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetExpires" DATETIME
);

-- CreateTable
CREATE TABLE "SecurityQuestions" (
    "id_security_question" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "security_question" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "QuestionsUser" (
    "id_security_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_security_question" INTEGER NOT NULL,
    "id_user" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    CONSTRAINT "QuestionsUser_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionsUser_id_security_question_fkey" FOREIGN KEY ("id_security_question") REFERENCES "SecurityQuestions" ("id_security_question") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");
