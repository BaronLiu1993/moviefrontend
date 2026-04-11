import { cookies } from "next/headers";
import HomeClient from "../custom/home/homeClient";

const Home = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  //Fetch feed data from backend API
  const bearer = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImJkZThjY2VjLWU0NzItNDA2Ny1iYzljLTUxZjE4MTIxYzNhNCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb2Njc3dwcGtzcWVnaXBwamVpLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI1YjhjYTg5OC0wNzU2LTRkYzUtODI1My00NTkzNDBmMjgwMTEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzc1ODc5OTc1LCJpYXQiOjE3NzU4NzYzNzUsImVtYWlsIjoiYmFyb25saXUxOTkzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJiYXJvbmxpdTE5OTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IlRlc3QgVXNlciIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiNWI4Y2E4OTgtMDc1Ni00ZGM1LTgyNTMtNDU5MzQwZjI4MDExIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NzU4NzYzNzV9XSwic2Vzc2lvbl9pZCI6ImFkOTc0NWZiLTBmM2YtNDliYy04YThjLTkyNzU5OWE2ZDQ1MCIsImlzX2Fub255bW91cyI6ZmFsc2V9.xLtE52lEnzbUwA5B0MM25etWAD5a3TnHM3EqccYb-14AejGBAKjZ9IRPkp_83ROZsD3AUTI3xNFCIltbQADNOg"
  const headers = { Authorization: `Bearer ${bearer}` };

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
      <HomeClient feed={feed} list={initialList} token={bearer} user={me.data}/>
    </div>
  );
};

export default Home;
