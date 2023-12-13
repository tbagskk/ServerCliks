/*
  Warnings:

  - Added the required column `name` to the `Infos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Infos" ADD COLUMN     "name" TEXT NOT NULL;
