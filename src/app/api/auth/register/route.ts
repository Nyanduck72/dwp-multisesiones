import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log({ user });

    return NextResponse.json({ message: "success" });
  } catch (e) {
    return NextResponse.json({ message: "Something unexpected ocurred" });
    console.log({ e });
  }

  // return NextResponse.json({ message: "success" });
}
