-- CreateTable
CREATE TABLE "ContactUs" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "message" VARCHAR(300) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactUs" ADD CONSTRAINT "ContactUs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
