"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ListInviteClientProps {
  code: string;
  token: string;
}

export default function ListInviteClient({ code, token }: ListInviteClientProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/list/redeem-invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || "Failed to join list");
        } else {
          setStatus("success");
          setMessage(`You've joined "${data.data?.listName || "the list"}"!`);
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [code, token]);

  return (
    <div className="flex items-center justify-center min-h-screen font-figtree">
      <div className="text-center space-y-4">
        {status === "loading" && (
          <p className="text-lg text-muted-foreground">Joining list...</p>
        )}
        {status === "success" && (
          <>
            <p className="text-2xl font-bold">{message}</p>
            <button
              onClick={() => router.push("/home")}
              className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
            >
              Go to Home
            </button>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-lg text-red-500">{message}</p>
            <button
              onClick={() => router.push("/home")}
              className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
            >
              Go to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
