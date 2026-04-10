import { cookies } from "next/headers";
import HomeClient from "../custom/home/homeClient";

const Home = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  //Fetch feed data from backend API
  const bearer = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImJkZThjY2VjLWU0NzItNDA2Ny1iYzljLTUxZjE4MTIxYzNhNCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb2Njc3dwcGtzcWVnaXBwamVpLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI1YjhjYTg5OC0wNzU2LTRkYzUtODI1My00NTkzNDBmMjgwMTEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzc1NzkzMzM1LCJpYXQiOjE3NzU3ODk3MzUsImVtYWlsIjoiYmFyb25saXUxOTkzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJiYXJvbmxpdTE5OTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IlRlc3QgVXNlciIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiNWI4Y2E4OTgtMDc1Ni00ZGM1LTgyNTMtNDU5MzQwZjI4MDExIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NzU3ODk3MzV9XSwic2Vzc2lvbl9pZCI6IjYzYzZkYWM5LWNhMTUtNDUzNC1hOTQxLTdjNmNmNTY2Y2EwNCIsImlzX2Fub255bW91cyI6ZmFsc2V9.2qQe3GobqQCcg6IBOLytW5ixISc4ftjgh7LIfhAQZN6Xbz-Sd1w2PlO_HOz6xTZa4u0ph84XA8Me1aBdCBWO6A"
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
