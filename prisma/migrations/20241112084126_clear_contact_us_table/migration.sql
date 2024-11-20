/*
  Warnings:

  - You are about to drop the `ContactUs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContactUs" DROP CONSTRAINT "ContactUs_userId_fkey";

-- DropTable
DROP TABLE "ContactUs";
