/* nestjs */
import { Module } from "@nestjs/common";

/* providers */
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma.service";
////////////////////////////////////////////////////////////////////////////////

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
