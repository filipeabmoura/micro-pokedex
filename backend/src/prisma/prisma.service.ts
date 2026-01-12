import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    private prisma!: PrismaClient;

    async onModuleInit() {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });

        const adapter = new PrismaPg(pool);

        this.prisma = new PrismaClient({
            adapter,
        });

        await this.prisma.$connect();
    }

    get client(){
        return this.prisma;
    }

    async onModuleDestroy(){
        await this.client.$disconnect();
    }
}