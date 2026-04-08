import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { listId } = await params;
  const token = request.headers.get("Authorization") || "";

  const response = await fetch(
    `http://localhost:8000/v1/api/list/items?listId=${listId}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  );

  const text = await response.text();
  try {
    const data = JSON.parse(text);
    return NextResponse.json(data, { status: response.status });
  } catch {
    return new NextResponse(text, { status: response.status });
  }
}
