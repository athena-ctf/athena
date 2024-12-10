import type { components } from "@repo/api";
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
import { Circle, Download, Lightbulb, Lock, LockOpen, ScrollText, Server } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/utils/api-client";
import { ctf } from "@/utils/ctf-data";
import { InstanceCard } from "./instance-card";

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
    apiClient
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

  const unlockHint = (id: string, index: number) => {
    apiClient.GET("/player/hint/unlock/{id}", { params: { path: { id } } }).then((resp) => {
      if (resp.error) {
        toast.error("Could not unlock hint");
        console.error(resp.error.message);
      } else {
        setChallengeDetails((details) => {
          if (details) {
            details.hints[index].status = {
              kind: "unlocked",
              value: resp.data.description,
            };
          }

          return details;
        });
      }
    });
    return "Loading ...";
  };

  const [challengeDetails, setChallengeDetails] =
    useState<components["schemas"]["DetailedChallenge"]>();

  useEffect(() => {
    apiClient
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
            <Circle className={`${challengeSummary.challenge.level}`} />
            <div>
              <DialogTitle>{challengeSummary.challenge.title}</DialogTitle>
              <DialogDescription className="flex flex-col items-center py-3">
                @{challengeSummary.challenge.author_name} &bull; {challengeSummary.challenge.points}{" "}
                points &bull; {challengeSummary.solves} Solves
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
            {challengeSummary.challenge.kind === "dynamic_containerized" && (
              <VerticalTabsTrigger value="deployment">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Server />
                    </TooltipTrigger>
                    <TooltipContent>
                      {challengeSummary.deployment ? "View Deployment" : "Start Deployment"}
                    </TooltipContent>
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
              <div
                dangerouslySetInnerHTML={{
                  __html: challengeSummary.challenge.description,
                }}
              />
            </ScrollArea>
          </VerticalTabsContent>
          {challengeSummary.challenge.kind === "dynamic_containerized" && ( // TODO
            <VerticalTabsContent value="deployment">
              {Array.isArray(challengeDetails?.instances) ? (
                challengeDetails.instances.map((instance) => (
                  <InstanceCard {...instance} key={instance.instance_model.id} />
                ))
              ) : (
                <>Not Started</> // TODO: add proper messages
              )}
            </VerticalTabsContent>
          )}
          {challengeDetails?.files.length && (
            <VerticalTabsContent value="files">
              <div className="flex flex-col justify-between space-y-2">
                {challengeDetails.files.map((file) => (
                  <Button key={file.name} variant="default" asChild>
                    <Link href={`https://static.${ctf.domain}/download/${file.id}`}>
                      <Download /> {file.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </VerticalTabsContent>
          )}
          {challengeDetails?.hints.length && (
            <VerticalTabsContent value="hints">
              <Accordion type="single" collapsible className="w-full">
                {challengeDetails.hints.map((hint, index) => (
                  <AccordionItem value={hint.id} key={hint.id}>
                    <AccordionTrigger>
                      {hint.status.kind === "unlocked" ? <LockOpen /> : <Lock />} Hint #{index} (
                      {hint.cost} Points)
                    </AccordionTrigger>
                    <AccordionContent>
                      {hint.status.kind === "unlocked"
                        ? hint.status.value
                        : unlockHint(hint.id, index)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </VerticalTabsContent>
          )}
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
