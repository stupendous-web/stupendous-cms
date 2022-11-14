import { NextResponse } from "next/server";
import { getIronSession } from "iron-session/edge";
import { ironOptions } from "./lib/config";

export const middleware = async (request) => {
  const response = NextResponse.next();
  const session = await getIronSession(request, response, ironOptions);

  console.log("session", session);
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url)); // redirect to /unauthorized page
  }

  return response;
};

export const config = {
  matcher: "/app",
};
