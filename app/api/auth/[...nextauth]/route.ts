import { NextResponse, type NextRequest } from "next/server";
import { authConfigured, handlers } from "@/auth";
export const runtime = "nodejs";
export function GET(request: NextRequest) { return authConfigured ? handlers.GET(request) : NextResponse.json({ error: "Sign-in is not configured." }, { status: 503 }); }
export function POST(request: NextRequest) { return authConfigured ? handlers.POST(request) : NextResponse.json({ error: "Sign-in is not configured." }, { status: 503 }); }
