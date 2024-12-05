import { useState, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { FilterPopover } from "./filter-popover";
import { FilterBadge } from "./filter-badge";
import type { components } from "@repo/api";

type Category = "tag" | "difficulty" | "status";
const STATUS_OPTIONS = ["solved", "unsolved", "challenge_limit_reached"];

interface FilterProps {
  tags: components["schemas"]["TagModel"][];
  difficulties: { level: string; value: string }[];
  onChange: (tags: string[], difficulties: string[], status: string[]) => void;
}

export function Filter({ tags, difficulties, onChange }: FilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const [tagOpen, setTagOpen] = useState(false);
  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const toggleSelection = (array: string[], value: string): string[] => {
    return array.includes(value) ? array.filter((item) => item !== value) : [...array, value];
  };

  const handleTagSelect = (tag: string) => {
    const newTags = toggleSelection(selectedTags, tag);
    setSelectedTags(newTags);
    onChange(newTags, selectedDifficulties, selectedStatus);
  };

  const handleDifficultySelect = (difficulty: string) => {
    const newDifficulties = toggleSelection(selectedDifficulties, difficulty);
    setSelectedDifficulties(newDifficulties);
    onChange(selectedTags, newDifficulties, selectedStatus);
  };

  const handleStatusSelect = (status: string) => {
    const newStatus = toggleSelection(selectedStatus, status);
    setSelectedStatus(newStatus);
    onChange(selectedTags, selectedDifficulties, newStatus);
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSelectedDifficulties([]);
    setSelectedStatus([]);
    onChange([], [], []);
  };

  const removeFilter = useCallback(
    (category: Category, value: string) => {
      switch (category) {
        case "tag": {
          const newTags = selectedTags.filter((t) => t !== value);
          setSelectedTags(newTags);
          onChange(newTags, selectedDifficulties, selectedStatus);
          break;
        }
        case "difficulty": {
          const newDifficulties = selectedDifficulties.filter((d) => d !== value);
          setSelectedDifficulties(newDifficulties);
          onChange(selectedTags, newDifficulties, selectedStatus);
          break;
        }
        case "status": {
          const newStatus = selectedStatus.filter((s) => s !== value);
          setSelectedStatus(newStatus);
          onChange(selectedTags, selectedDifficulties, newStatus);
          break;
        }
      }
    },
    [selectedTags, selectedDifficulties, selectedStatus, onChange],
  );

  const hasActiveFilters =
    selectedTags.length > 0 || selectedDifficulties.length > 0 || selectedStatus.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <FilterPopover
          open={tagOpen}
          setOpen={setTagOpen}
          options={tags}
          selected={selectedTags}
          onSelect={handleTagSelect}
          placeholder="Search tags..."
          buttonText="Tags"
        />

        <FilterPopover
          open={difficultyOpen}
          setOpen={setDifficultyOpen}
          options={difficulties.map((d) => ({
            id: d.level.toString(),
            value: d.value,
          }))}
          selected={selectedDifficulties}
          onSelect={handleDifficultySelect}
          placeholder="Search difficulty..."
          buttonText="Difficulty"
        />

        <FilterPopover
          open={statusOpen}
          setOpen={setStatusOpen}
          options={STATUS_OPTIONS.map((s) => ({ id: s, value: s }))}
          selected={selectedStatus}
          onSelect={handleStatusSelect}
          placeholder="Search status..."
          buttonText="Status"
        />

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="h-8 px-2 lg:px-3" onClick={clearAllFilters}>
            Reset
            <X className="ml-2 size-4" />
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <FilterBadge
              key={tag}
              label={tag}
              category="tag"
              onRemove={() => removeFilter("tag", tag)}
            />
          ))}
          {selectedDifficulties.map((difficulty) => (
            <FilterBadge
              key={difficulty}
              label={difficulty}
              category="difficulty"
              onRemove={() => removeFilter("difficulty", difficulty)}
            />
          ))}
          {selectedStatus.map((status) => (
            <FilterBadge
              key={status}
              label={status}
              category="status"
              onRemove={() => removeFilter("status", status)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
