import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export type PrismaArgsType = {
  select?: Prisma.WordSelect<DefaultArgs>;
  include?: Prisma.WordInclude<DefaultArgs>;
  where?: Prisma.WordWhereInput;
  orderBy?:
    | Prisma.WordOrderByWithRelationInput
    | Prisma.WordOrderByWithRelationInput[];
  cursor?: Prisma.WordWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.WordScalarFieldEnum | Prisma.WordScalarFieldEnum[];
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
