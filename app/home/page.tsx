import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeClient from "../custom/home/homeClient";

const Home = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const headers = { Authorization: `Bearer ${token}` };

  const [feedRes, listRes, meRes] = await Promise.all([
    fetch("http://localhost:8000/v1/api/feed/generate-feed?page=1&pageSize=40", { headers }),
    fetch("http://localhost:8000/v1/api/list", { headers }),
    fetch("http://localhost:8000/v1/api/auth/me", { headers }),
  ]);

  const [feed, list, me] = await Promise.all([
    feedRes.json(),
    listRes.json(),
    meRes.json(),
  ]);

  const initialList = list.data;
  return (
    <div>
      <HomeClient feed={feed} list={initialList} token={token} user={me.data}/>
    </div>
  );
};

export default Home;
