import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import { Input, type InputProps } from "@ui/components/ui/input";
import { XIcon } from "lucide-react";
import {
  type Dispatch,
  type SetStateAction,
  forwardRef,
  useState,
} from "react";

type InputTagsProps = InputProps & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

export const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    return (
      <>
        <div className="flex">
          <Input
            value={pendingDataPoint}
            onChange={(e) => setPendingDataPoint(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addPendingDataPoint();
              } else if (e.key === "," || e.key === " ") {
                e.preventDefault();
                addPendingDataPoint();
              }
            }}
            className="rounded-r-none"
            {...props}
            ref={ref}
          />
          <Button
            type="button"
            variant="secondary"
            className="rounded-l-none border border-l-0"
            onClick={addPendingDataPoint}
          >
            Add
          </Button>
        </div>
        <div className="flex min-h-[2.5rem] flex-wrap items-center gap-2 overflow-y-auto rounded-md border p-2">
          {value.map((item) => (
            <Badge key={item} variant="secondary">
              {item}
              <button
                type="button"
                className="ml-2 w-3"
                onClick={() => {
                  onChange(value.filter((i) => i !== item));
                }}
              >
                <XIcon className="w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </>
    );
  },
);

InputTags.displayName = "InputTags";
