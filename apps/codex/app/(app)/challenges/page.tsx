import { client } from "@repo/api";
import { ChallengeCard } from "@/components/challenge/card";
import {
  MainChallengesFilter,
  MobileChallengesFilter,
} from "@/components/challenge/filter";
import {
  MainChallengesSearch,
  MobileChallengesSearch,
} from "@/components/challenge/search";
import { cookies } from "next/headers";

async function getTags() {
  const { data, error } = await client.GET("/tag", {
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    console.error(error.message);
  }

  return data ?? [];
}

async function getChallenges() {
  const { data, error } = await client.GET("/challenge", {
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    console.error(error.message);
  }

  return data ?? [];
}

async function getChallengeRelations(id: string) {
  const { data, error } = await client.GET("/challenge/{id}/relations", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    throw error.message;
  }

  return data;
}

export default async function Page() {
  const tags = await getTags();
  const challenges = await getChallenges();

  return (
    <div className="m-2">
      <div className="mr-4 flex justify-between md:hidden">
        <MobileChallengesSearch />
        <MobileChallengesFilter tag={tags} />
      </div>
      <div className="mr-4 hidden justify-between md:flex">
        <MainChallengesSearch />
        <div className="mx-2 md:flex">
          <MainChallengesFilter tag={tags} />
          <MainChallengesFilter tag={tags} />
        </div>
      </div>
      <div className="py-5">
        {challenges.map(async (challenge) => (
          <ChallengeCard
            relations={await getChallengeRelations(challenge.id)}
            key={challenge.id}
          />
        ))}
      </div>
    </div>
  );
}
