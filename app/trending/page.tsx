import { cookies } from "next/headers";
import FriendFeedClient from "../custom/trending/friendFeedClient";

const TrendingPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  // TODO: use real token from cookie once auth is wired
  const bearer = token || "";

  return <FriendFeedClient token={bearer} />;
};

export default TrendingPage;
