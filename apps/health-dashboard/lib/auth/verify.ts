import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "database";
import { getServerSession } from "next-auth";

interface VerifyResult {
    success: boolean;
    message: string;
    user?: Omit<User, 'password'>
}

export default async function verifySession(): Promise<VerifyResult> {
    const session = await getServerSession(authOptions);

    if (!session) return {
        success: false,
        message: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }

    return {
        success: true,
        message: "Acesso liberado",
        user: session.user as Omit<User, 'password'>
    }
}