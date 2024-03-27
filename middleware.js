export function middleware(request) {
    const currentUser = request.cookies.get("email")?.value;
  
    if (currentUser && !request.nextUrl.pathname.startsWith('/')) {
      return Response.redirect(new URL('/', request.url));
    }
  
    if (!currentUser && !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/signup")) {
      return Response.redirect(new URL("/login", request.url));
    }
  }
  
  export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/signup"],
  };