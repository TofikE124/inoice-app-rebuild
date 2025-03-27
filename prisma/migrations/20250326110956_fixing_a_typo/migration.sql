/*
  Warnings:

  - The values [NET_30_DAY] on the enum `Invoice_paymentTerms` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Invoice` MODIFY `paymentTerms` ENUM('NET_1_DAY', 'NET_7_DAYS', 'NET_14_DAYS', 'NET_30_DAYS') NOT NULL;
