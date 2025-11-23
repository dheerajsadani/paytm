import { prisma } from "@/app/lib/prisma";
import userData from "@/app/lib/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
   return await userData();
}