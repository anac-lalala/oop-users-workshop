import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({ ok: true, todo: "implementar" }, { status: 502 });
}
