"use client";

import type { components } from "@repo/api";
import { updateProfile } from "@ui/components/actions";
import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UserUpdateDialog({
  player,
}: {
  player: components["schemas"]["PlayerModel"];
}) {
  const [displayName, setDisplayName] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayName" className="text-right">
              Name
            </Label>
            <Input
              id="displayName"
              defaultValue={player.display_name}
              className="col-span-3"
              value={displayName}
              onChange={(ev) => setDisplayName(ev.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() =>
              updateProfile(player.id, player.team_id ?? "", displayName).then(
                (res) => {
                  if (res.error) toast.error(res.error.message);
                  else toast.success("Updated profile successfully");
                },
              )
            }
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
