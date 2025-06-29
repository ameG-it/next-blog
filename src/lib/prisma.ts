// PrismaClientをインポート
import { PrismaClient } from "@prisma/client";

// グローバルスコープにPrismaClientインスタンスを保持するための設定
// globalThisを型アサーションして、prismaプロパティを追加
export const grobalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined; // PrismaClient型またはundefined
};

// 既存のPrismaClientインスタンスがあればそれを使用し、なければ新しいインスタンスを作成
export const prisma = grobalPrisma.prisma || new PrismaClient();
