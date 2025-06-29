/*
  Warnings:

  - You are about to drop the column `location` on the `Property` table. All the data in the column will be lost.
*/

-- Step 1: Add new columns as nullable first
ALTER TABLE "Property" ADD COLUMN "district" TEXT;
ALTER TABLE "Property" ADD COLUMN "province" TEXT;
ALTER TABLE "Property" ADD COLUMN "streetAddress" TEXT;
ALTER TABLE "Property" ADD COLUMN "ward" TEXT;

-- Step 2: Update existing data with default values based on location
UPDATE "Property" SET 
  "province" = 'TP.HCM',
  "district" = 'Quận 2',
  "ward" = 'Thảo Điền',
  "streetAddress" = 'Trục đường Xa Lộ Hà Nội, liền kề khu Thảo Điền'
WHERE "id" = 1;

UPDATE "Property" SET 
  "province" = 'TP.HCM',
  "district" = 'Quận 1',
  "ward" = 'Bến Nghé',
  "streetAddress" = 'Số 2, đường Tôn Đức Thắng'
WHERE "id" = 2;

-- Step 3: Make columns required
ALTER TABLE "Property" ALTER COLUMN "district" SET NOT NULL;
ALTER TABLE "Property" ALTER COLUMN "province" SET NOT NULL;
ALTER TABLE "Property" ALTER COLUMN "streetAddress" SET NOT NULL;
ALTER TABLE "Property" ALTER COLUMN "ward" SET NOT NULL;

-- Step 4: Drop the old location column
ALTER TABLE "Property" DROP COLUMN "location";
