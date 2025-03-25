-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_billFromId_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_billToId_fkey`;

-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_invoiceId_fkey`;

-- DropIndex
DROP INDEX `Item_invoiceId_fkey` ON `Item`;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_billFromId_fkey` FOREIGN KEY (`billFromId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_billToId_fkey` FOREIGN KEY (`billToId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
