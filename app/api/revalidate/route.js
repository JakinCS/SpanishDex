import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";


// This API route is used instead of a server action to prevent the current page from refreshing
export async function POST(req) {
  try {
    const { tags } = await req.json();

    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json({ error: "Invalid tags format" }, { status: 400 });
    }

    tags.forEach((tag) => revalidateTag(tag));

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error); // Capture the error event with Sentry
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }

}