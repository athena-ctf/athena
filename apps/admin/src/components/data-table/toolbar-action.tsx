import { Button } from "@ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import type { LucideIcon } from "lucide-react";

const DropdownAction = ({
  label,
  icon: Icon,
  options,
  action,
}: Extract<ToolbarActionProps, { kind: "dropdown" }>) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="ml-auto h-8">
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {options.map((option) => (
        <DropdownMenuItem onClick={() => action(option.value)} key={option.value}>
          {option.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const ButtonAction = ({
  label,
  icon: Icon,
  action,
}: Extract<ToolbarActionProps, { kind: "button" }>) => (
  <Button variant="outline" size="sm" className="ml-auto h-8" key={label} onClick={() => action()}>
    <Icon className="mr-2 h-4 w-4" />
    {label}
  </Button>
);

export type ToolbarActionProps =
  | {
      kind: "dropdown";
      label: string;
      icon: LucideIcon;
      options: { label: string; value: string }[];
      action: (selected: string) => void;
    }
  | {
      kind: "button";
      label: string;
      icon: LucideIcon;
      action: () => void;
    };

export function ToolbarAction(props: ToolbarActionProps) {
  if (props.kind === "button") return <ButtonAction {...props} />;

  return <DropdownAction {...props} />;
}
