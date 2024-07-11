import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"




interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    const {email, name, password} = await request.json() as CreateUserRequest;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      }
    })

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
