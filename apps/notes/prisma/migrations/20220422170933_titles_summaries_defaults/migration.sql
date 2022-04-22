-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "summary" TEXT NOT NULL DEFAULT E'This document has no summary.',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT E'Untitled',
ALTER COLUMN "content" SET DEFAULT E'Write something amazing.';
