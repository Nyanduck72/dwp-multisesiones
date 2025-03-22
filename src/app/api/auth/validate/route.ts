import { verifyJwt } from "@/lib/jwt";

export async function GET(request: Request) {
  const accessToken = request.headers.get("Authorization");

  if (accessToken && verifyJwt(accessToken))
    return new Response(
      JSON.stringify({
        message: "ok",
      }),
      { status: 200 },
    );

  return new Response(
    JSON.stringify({
      message: "Unauthorized",
    }),
    { status: 401 },
  );
}
