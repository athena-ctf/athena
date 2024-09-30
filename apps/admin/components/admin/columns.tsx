"use client";

import type { components } from "@repo/api";
import type {
  CellContext,
  ColumnDef,
  HeaderContext,
  Row,
} from "@tanstack/react-table";
import { Button } from "@ui/components/ui/button";
import { Checkbox } from "@ui/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import type { z } from "zod";

import { DataTableColumnHeader } from "@repo/ui/data-table-column-header";
import { Dialog, DialogTrigger } from "@repo/ui/dialog";
import { AchievementDialogContent } from "./achievement";
import {
  deleteAchievement,
  deleteBan,
  deleteChallenge,
  deleteFile,
  deleteFlag,
  deleteHint,
  deleteInstance,
  deleteInvite,
  deleteNotification,
  deletePlayer,
  deleteSubmission,
  deleteTag,
  deleteTeam,
  deleteUser,
} from "./actions";
import { BanDialogContent } from "./ban";
import { ChallengeDialogContent } from "./challenge";
import { FileDialogContent } from "./file";
import { FlagDialogContent } from "./flag";
import { HintDialogContent } from "./hint";
import { InstanceDialogContent } from "./instance";
import { InviteDialogContent } from "./invite";
import { NotificationDialogContent } from "./notification";
import { PlayerDialogContent } from "./player";
import type { challengeSchema } from "./schemas";
import { SubmissionDialogContent } from "./submission";
import { TagDialogContent } from "./tag";
import { TeamDialogContent } from "./team";
import { UserDialogContent } from "./user";
import React from "react";

function toTitle(s: string) {
  return s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
    c ? c.toUpperCase() : ` ${d.toUpperCase()}`,
  );
}

type Fields<T> = {
  [_ in keyof T]: boolean;
};

function getColumnDef<T extends U, U>(
  fields: Fields<T>,
  deleteObject: (_: string) => void,
  updateDialogContent: (_: U) => ReactNode,
): ColumnDef<T>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    ...Object.entries<boolean>(fields).map(([field, sortable]) => ({
      accessorKey: field,
      header: ({ column }: HeaderContext<T, unknown>) =>
        sortable ? (
          <DataTableColumnHeader column={column} title={toTitle(field)} />
        ) : (
          <>{toTitle(field)}</>
        ),
      cell: ({ row }: CellContext<T, unknown>) => {
        return <div className="pl-5 font-medium">{row.getValue(field)}</div>;
      },
      filterFn: (row: Row<T>, columnId: string, filterValue: any) => {
        return filterValue.includes(row.getValue(columnId));
      },
    })),
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <DialogTrigger>Update</DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteObject(row.getValue("id"))}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {updateDialogContent(row.original)}
          </Dialog>
        );
      },
    },
  ];
}

export const achievementColumns = getColumnDef<
  components["schemas"]["AchievementModel"],
  components["schemas"]["AchievementDetails"]
>(
  {
    id: true,
    date_created: true,
    value: true,
    player_id: true,
    team_id: true,
    challenge_id: true,
    prize: false,
  },
  deleteAchievement,
  (values) => <AchievementDialogContent action="Update" values={values} />,
);

export const banColumns = getColumnDef<
  components["schemas"]["BanModel"],
  components["schemas"]["BanDetails"]
>(
  {
    id: true,
    date_created: true,
    duration: true,
    reason: false,
  },
  deleteBan,
  (values) => (
    <BanDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const challengeColumns = getColumnDef<
  components["schemas"]["ChallengeModel"],
  Omit<z.infer<typeof challengeSchema>, "tags" | "container_build_context">
>(
  {
    id: true,
    title: true,
    status: true,
    min_points: false,
    max_points: false,
    author_name: false,
    description: false,
    difficulty: true,
    points: false,
    flag_type: true,
  },
  deleteChallenge,
  (values) => (
    <ChallengeDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const fileColumns = getColumnDef<
  components["schemas"]["FileModel"],
  Omit<components["schemas"]["UploadedFile"], "file">
>(
  {
    id: true,
    name: false,
    backend: true,
    challenge_id: true,
    mime: false,
    sha1_hash: false,
  },
  deleteFile,
  (values) => (
    <FileDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const flagColumns = getColumnDef<
  components["schemas"]["FlagModel"],
  components["schemas"]["FlagDetails"]
>(
  {
    id: true,
    value: false,
    player_id: true,
    challenge_id: true,
  },
  deleteFlag,
  (values) => <FlagDialogContent action="Update" values={values} />,
);

export const hintColumns = getColumnDef<
  components["schemas"]["HintModel"],
  components["schemas"]["HintDetails"]
>(
  {
    id: true,
    cost: true,
    description: false,
    challenge_id: true,
  },
  deleteHint,
  (values) => (
    <HintDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const instanceColumns = getColumnDef<
  components["schemas"]["InstanceModel"],
  components["schemas"]["InstanceDetails"]
>(
  {
    id: true,
    date_created: true,
    player_id: true,
    challenge_id: true,
    expiry: true,
    container_id: false,
    container_port: false,
  },
  deleteInstance,
  (values) => (
    <InstanceDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const inviteColumns = getColumnDef<
  components["schemas"]["InviteModel"],
  components["schemas"]["InviteDetails"]
>(
  {
    id: true,
    remaining: true,
    team_id: true,
    usages: true,
  },
  deleteInvite,
  (values) => (
    <InviteDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const notificationColumns = getColumnDef<
  components["schemas"]["NotificationModel"],
  components["schemas"]["NotificationDetails"]
>(
  {
    id: true,
    player_id: true,
    date: true,
    title: false,
    content: false,
  },
  deleteNotification,
  (values) => (
    <NotificationDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const playerColumns = getColumnDef<
  components["schemas"]["PlayerModel"],
  components["schemas"]["PlayerDetails"]
>(
  {
    id: true,
    user_id: true,
    display_name: false,
    team_id: true,
    ban_id: true,
    verified: true,
  },
  deletePlayer,
  (values) => <PlayerDialogContent action="Update" values={values} />,
);

export const submissionColumns = getColumnDef<
  components["schemas"]["SubmissionModel"],
  components["schemas"]["SubmissionDetails"]
>(
  {
    challenge_id: true,
    date_created: true,
    flag: false,
    id: true,
    player_id: true,
    result: true,
  },
  deleteSubmission,
  (values) => (
    <SubmissionDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const tagColumns = getColumnDef<
  components["schemas"]["TagModel"],
  components["schemas"]["TagDetails"]
>(
  {
    id: true,
    value: false,
  },
  deleteTag,
  (values) => (
    <TagDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const teamColumns = getColumnDef<
  components["schemas"]["TeamModel"],
  components["schemas"]["TeamDetails"]
>(
  {
    ban_id: true,
    date_created: true,
    email: false,
    id: true,
    name: false,
  },
  deleteTeam,
  (values) => (
    <TeamDialogContent
      action="Update"
      values={values}
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);

export const userColumns = getColumnDef<
  components["schemas"]["UserModel"],
  Omit<components["schemas"]["UserDetails"], "password">
>(
  {
    date_created: true,
    email: false,
    id: true,
    role: true,
    username: false,
  },
  deleteUser,
  (values) => (
    <UserDialogContent
      action="Update"
      values={{ ...values, password: "" }} // TODO
      closeDialog={(): void => {
        throw new Error("Function not implemented.");
      }}
    />
  ),
);
