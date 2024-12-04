import { X } from "lucide-react";

type Category = "tag" | "difficulty" | "status";

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  category: Category;
}

export function FilterBadge({ label, onRemove, category }: FilterBadgeProps) {
  const getBadgeColors = (category: string) => {
    switch (category) {
      case "tag":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case "difficulty":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case "status":
        return "bg-purple-100 text-purple-700 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${getBadgeColors(
        category,
      )}`}
    >
      {label}
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        className="ml-1 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 rounded-full"
      >
        <X className="size-3" />
      </button>
    </span>
  );
}
