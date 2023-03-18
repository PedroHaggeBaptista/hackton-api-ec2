/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `contatos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `patrocinadores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contatos_email_key" ON "contatos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patrocinadores_email_key" ON "patrocinadores"("email");
