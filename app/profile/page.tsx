import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="font-figtree px-8 py-8">
      <h1 className="text-2xl font-bold">My Posts</h1>
    </div>
  );
};

export default ProfilePage;
