"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Link, Check } from "lucide-react";

interface EditListDialogProps {
  name: string;
  listId: string;
  token: string;
}

const EditListDialog = ({ name, listId, token }: EditListDialogProps) => {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState(name);

  const handleSave = async () => {
    if (!listName.trim()) return;
    try {
      await fetch(`/api/list/${listId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: listName.trim() }),
      });
      setOpen(false);
    } catch (err) {
      console.error("Failed to update list:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group px-4 py-2 text-sm text-zinc-500 transition cursor-pointer flex items-center gap-1 rounded-md border-2 hover:border-green-700 hover:text-white hover:bg-green-700">
          <Pencil className="w-4 h-4 text-green-700 group-hover:text-white transition" />
          Edit List
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit List</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="List name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <Button className="w-fit" disabled={!listName.trim()} onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InviteCollabDialog = ({ listId, token }: { listId: string; token: string }) => {
  const [open, setOpen] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateLink = useCallback(async () => {
    setInviteLoading(true);
    setInviteUrl("");
    setCopied(false);
    try {
      const res = await fetch("/api/list/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listId }),
      });
      const data = await res.json();
      if (res.ok) {
        setInviteUrl(data.url || "");
      }
    } catch {
      // ignore
    } finally {
      setInviteLoading(false);
    }
  }, [listId, token]);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (value) {
      generateLink();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="group px-4 py-2 text-sm text-zinc-500 transition cursor-pointer flex items-center gap-1 rounded-md border-2 hover:border-blue-600 hover:text-white hover:bg-blue-600">
          <Link className="w-4 h-4 text-blue-600 group-hover:text-white transition" />
          Invite
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Collaborators</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 font-figtree text-sm">
          <p className="text-muted-foreground">
            Share this link with anyone to invite them to collaborate on this list. They&apos;ll need to log in or create an account first.
          </p>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={inviteLoading ? "Generating link..." : inviteUrl}
              className="text-sm text-muted-foreground"
            />
            <Button
              variant="outline"
              size="sm"
              disabled={inviteLoading || !inviteUrl}
              onClick={() => {
                navigator.clipboard.writeText(inviteUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? <Check className="w-4 h-4" /> : "Copy"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditListDialog;
export { InviteCollabDialog };
