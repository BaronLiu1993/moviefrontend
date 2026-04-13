import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ListInviteClient from "./listInviteClient";

export default async function ListInvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect(`/login?redirect=/list-invite/${code}`);
  }

  return <ListInviteClient code={code} token={token} />;
}
