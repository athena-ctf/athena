import { parseISO } from "date-fns";
import baseCtf from "../../ctf.json";

export interface Ctf {
  description: string;
  domain: string;
  level_map: { [key: string]: Level };
  name: string;
  prizes: { [key: string]: string[] };
  sponsors: { [key: string]: Sponsor[] };
  time: Time;
}

export interface Level {
  color: string;
  name: string;
}

export interface Sponsor {
  logo: string;
  name: string;
}

export interface Time {
  end: Date;
  freeze: Date;
  start: Date;
}

const ctf = {
  ...baseCtf,
  time: {
    end: parseISO(baseCtf.time.end),
    freeze: parseISO(baseCtf.time.freeze),
    start: parseISO(baseCtf.time.start),
  },
} satisfies Ctf as Ctf;

export { ctf };
