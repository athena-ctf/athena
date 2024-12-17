import { format, formatDistanceToNow, parseISO } from "date-fns";

export const formatDate = (date: string, dateStyle?: string) => {
  if (dateStyle === "relative")
    return formatDistanceToNow(parseISO(date), { addSuffix: true, includeSeconds: true });

  if (dateStyle === "absolute") return format(parseISO(date), "EEEE, MMMM do yyyy, h:mm a");

  return date;
};
