import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name } = body;

        if (typeof name !== 'string') {
            return NextResponse.json({ error: "Invalid data: name is required" }, { status: 400 });
        }

        await db.update(users)
            .set({ name })
            .where(eq(users.id, session.user.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
