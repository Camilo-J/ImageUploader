import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  console.log(req.body); // File object
  let json_response = {
    code: 200,
    status: "success",
    url: "https://www.google.com",
  };
  return NextResponse.json(json_response);
}
