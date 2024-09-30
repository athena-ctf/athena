"use client";

import type { components } from "@repo/api";
import { verifyFlag } from "@ui/components/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/ui/accordion";
import { Badge } from "@ui/components/ui/badge";
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
import { ScrollArea } from "@ui/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from "@/components/challenge/vertical-tabs";
import { Circle, Download, Lightbulb, ScrollText, Server } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

const difficultyColors = {
  easy: "fill-green-400 text-green-400",
  medium: "fill-yellow-300 text-yellow-300",
  hard: "fill-red-500 text-red-500",
  extreme: "",
};

export function ChallengeModal({
  challenge: {
    id,
    difficulty,
    title,
    author_name,
    description,
    max_points,
    min_points,
    container_details,
  },
  tags,
  solves,
  files,
  hints,
  children,
}: components["schemas"]["ChallengeRelations"] & {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("");

  const handleVerify = () => {
    console.log(flag, id);
    verifyFlag(flag, id)
      .then((res) => {
        setOpen(false);
        if (res.result === "pass") {
          toast.success("Correct flag!");
        } else {
          toast.error("Invalid flag!");
        }

        setFlag("");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex place-content-center justify-between">
            <Circle className={difficultyColors[difficulty]} />
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="flex flex-col items-center py-3">
                @{author_name} &bull;{" "}
                {Math.floor((max_points - min_points) / solves + min_points)}{" "}
                points &bull; {solves} Solves
              </DialogDescription>
            </div>
            <div className="flex flex-row space-x-2">
              {tags.map((tag) => (
                <Badge className="my-auto" key={tag.id}>
                  {tag.value}
                </Badge>
              ))}
            </div>
          </div>
        </DialogHeader>
        <VerticalTabs defaultValue="description">
          <VerticalTabsList>
            <VerticalTabsTrigger value="description">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ScrollText />
                  </TooltipTrigger>
                  <TooltipContent>Description</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </VerticalTabsTrigger>
            {container_details?.per_user && (
              <VerticalTabsTrigger value="instance">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Server />
                    </TooltipTrigger>
                    <TooltipContent>Create Instance</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </VerticalTabsTrigger>
            )}
            {files.length && (
              <VerticalTabsTrigger value="files">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Download />
                    </TooltipTrigger>
                    <TooltipContent>Download Files</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </VerticalTabsTrigger>
            )}
            {hints.length && (
              <VerticalTabsTrigger value="hints">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Lightbulb />
                    </TooltipTrigger>
                    <TooltipContent>View Hints</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </VerticalTabsTrigger>
            )}
          </VerticalTabsList>
          <VerticalTabsContent value="description">
            <ScrollArea className="h-max">{description}</ScrollArea>
          </VerticalTabsContent>
          <VerticalTabsContent value="instance">
            {/* TODO */}
          </VerticalTabsContent>
          <VerticalTabsContent value="files">
            <div className="flex flex-col justify-between space-y-2">
              {files.map((file) => (
                <Button key={file.id} variant="default" asChild>
                  <Link href="">
                    <Download /> {file.name}
                  </Link>
                </Button>
              ))}
            </div>
          </VerticalTabsContent>
          <VerticalTabsContent value="hints">
            <Accordion type="single" collapsible className="w-full">
              {hints.map((hint, index) => (
                <AccordionItem value={hint.id} key={hint.id}>
                  <AccordionTrigger>
                    Hint #{index} ({hint.cost} Points)
                  </AccordionTrigger>
                  <AccordionContent>{hint.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </VerticalTabsContent>
        </VerticalTabs>
        <DialogFooter className="flex-row space-x-4 px-8">
          <Input
            placeholder="Enter flag"
            value={flag}
            onChange={(ev) => setFlag(ev.target.value)}
          />
          <Button onClick={() => handleVerify()}>Submit Flag</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
