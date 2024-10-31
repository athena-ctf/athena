import { fetchClient, type components } from "@repo/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from "./vertical-tabs";
import { Circle, Download, Lightbulb, ScrollText, Server } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const difficultyColors = {
  easy: "fill-green-400 text-green-400",
  medium: "fill-yellow-300 text-yellow-300",
  hard: "fill-red-500 text-red-500",
  extreme: "",
};

export function ChallengeModal({
  challengeSummary,
  children,
}: {
  challengeSummary: components["schemas"]["ChallengeSummary"];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("");

  const handleVerify = () => {
    fetchClient
      .POST("/player/flag/verify", {
        body: { challenge_id: challengeSummary.challenge.id, flag },
      })
      .then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        } else {
          if (res.data.is_correct) {
            toast.success("Correct flag!");
            setFlag("");
            setOpen(false);
          } else {
            toast.error("Wrong flag!");
          }
        }
      });
  };

  const [challengeDetails, setChallengeDetails] =
    useState<components["schemas"]["DetailedChallenge"]>();

  useEffect(() => {
    fetchClient
      .GET("/player/challenge/details/{id}", {
        params: { path: { id: challengeSummary.challenge.id } },
      })
      .then((resp) => {
        if (resp.error) {
          toast.error("Could not load challenge details");
          console.error(resp.error.message);
        } else {
          setChallengeDetails(resp.data);
        }
      });
  }, [challengeSummary.challenge.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex place-content-center justify-between">
            <Circle
              className={
                difficultyColors[challengeSummary.challenge.difficulty]
              }
            />
            <div>
              <DialogTitle>{challengeSummary.challenge.title}</DialogTitle>
              <DialogDescription className="flex flex-col items-center py-3">
                @{challengeSummary.challenge.author_name} &bull;{" "}
                {challengeSummary.challenge.points} points &bull;{" "}
                {challengeSummary.challenge.solves} Solves
              </DialogDescription>
            </div>
            <div className="flex flex-row space-x-2">
              {challengeSummary.tags.map((tag) => (
                <Badge className="my-auto" key={tag.value}>
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
            {challengeSummary.challenge.container_details?.per_user && (
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
            {challengeDetails?.files.length && (
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
            {challengeDetails?.hints.length && (
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
            <ScrollArea className="h-max">
              {challengeSummary.challenge.description}
            </ScrollArea>
          </VerticalTabsContent>
          <VerticalTabsContent value="instance">
            {/* TODO */}
          </VerticalTabsContent>
          <VerticalTabsContent value="files">
            <div className="flex flex-col justify-between space-y-2">
              {challengeDetails?.files.map((file) => (
                <Button key={file.name} variant="default" asChild>
                  <Link href={file.url}>
                    <Download /> {file.name}
                  </Link>
                </Button>
              ))}
            </div>
          </VerticalTabsContent>
          <VerticalTabsContent value="hints">
            <Accordion type="single" collapsible className="w-full">
              {challengeDetails?.hints.map((hint, index) => (
                <AccordionItem value={hint.id} key={hint.id}>
                  <AccordionTrigger>
                    Hint #{index} ({hint.cost} Points)
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* TODO: add unlock function */}
                  </AccordionContent>
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
