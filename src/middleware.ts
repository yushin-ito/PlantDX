import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { Database } from "./types/schema";

export const middleware = async (request: NextRequest) => {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/signup") &&
    !pathname.startsWith("/verify")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (pathname === "/") {
    const plantId = request.cookies.get("plantId")?.value;

    if (plantId) {
      const url = request.nextUrl.clone();
      url.pathname = `/${plantId}/flow`;
      return NextResponse.redirect(url);
    }
  }

  return response;
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
