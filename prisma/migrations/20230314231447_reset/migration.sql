/*
  Warnings:

  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `necessity` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `studie` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `where` on the `users` table. All the data in the column will be lost.
  - Added the required column `acceptTerms` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentType` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habilities` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `history` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `why` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "acceptTerms" BOOLEAN NOT NULL,
    "contact" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "twitter" TEXT DEFAULT 'Não informado',
    "github" TEXT DEFAULT 'Não informado',
    "linkedin" TEXT DEFAULT 'Não informado',
    "instagram" TEXT DEFAULT 'Não informado',
    "document" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "why" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "habilities" TEXT NOT NULL,
    "mailing" BOOLEAN NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("approved", "createdAt", "email", "id", "mailing", "updatedAt") SELECT "approved", "createdAt", "email", "id", "mailing", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
