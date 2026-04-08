import { cookies } from "next/headers";
import HomeClient from "../custom/home/homeClient";

const Home = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  //Fetch feed data from backend API
  const bearer = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImJkZThjY2VjLWU0NzItNDA2Ny1iYzljLTUxZjE4MTIxYzNhNCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb2Njc3dwcGtzcWVnaXBwamVpLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI1YjhjYTg5OC0wNzU2LTRkYzUtODI1My00NTkzNDBmMjgwMTEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzc1NjkyMDkxLCJpYXQiOjE3NzU2ODg0OTEsImVtYWlsIjoiYmFyb25saXUxOTkzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJiYXJvbmxpdTE5OTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IlRlc3QgVXNlciIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiNWI4Y2E4OTgtMDc1Ni00ZGM1LTgyNTMtNDU5MzQwZjI4MDExIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NzU2ODg0OTF9XSwic2Vzc2lvbl9pZCI6IjQ5MjQ2MzkzLWU1ODYtNDU4My04NWZlLTA3MWJhOTcyNTllMSIsImlzX2Fub255bW91cyI6ZmFsc2V9.o-qFGA066X14JneUOlny7AVxGvY97emLxpJFX8u4DKPu9l1grinlyNy_3xRmFlFqtu2vCAuz4q7Md8aQIGEU3Q"
  const response = await fetch(
    "http://localhost:8000/v1/api/feed/generate-feed?page=1&pageSize=40",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    },
  );

  const listResponse = await fetch(
    "http://localhost:8000/v1/api/list",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    },
  )
  const feed = await response.json();
  const list = await listResponse.json();
  const initialList = list.data;
  return (
    <div>
      <HomeClient feed={feed} list={initialList} token={bearer}/>
    </div>
  );
};

export default Home;
