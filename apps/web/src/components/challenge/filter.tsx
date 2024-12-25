import { ctf } from "@/utils/ctf-data";
import { Button } from "@repo/ui/components/button";
import { X } from "lucide-react";
import { useState } from "react";
import { FilterPopover } from "./filter-popover";

const STATUS_OPTIONS = ["solved", "unsolved", "challenge_limit_reached"];
const DIFFICULTIES = ctf.levels.map((level) => ({
  value: level.value.toString(),
  label: level.name,
}));

interface FilterProps {
  tags: string[];
  onChange: (tags: string[], difficulties: string[], status: string[]) => void;
}

export function Filter({ tags, onChange }: FilterProps) {
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

  const hasActiveFilters =
    selectedTags.length > 0 || selectedDifficulties.length > 0 || selectedStatus.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <FilterPopover
          open={tagOpen}
          setOpen={setTagOpen}
          options={tags.map((tag) => ({ label: tag, value: tag }))}
          selected={selectedTags}
          onSelect={handleTagSelect}
          placeholder="Search tags..."
          title="Tags"
        />

        <FilterPopover
          open={difficultyOpen}
          setOpen={setDifficultyOpen}
          options={DIFFICULTIES}
          selected={selectedDifficulties}
          onSelect={handleDifficultySelect}
          placeholder="Search difficulty..."
          title="Difficulty"
        />

        <FilterPopover
          open={statusOpen}
          setOpen={setStatusOpen}
          options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))}
          selected={selectedStatus}
          onSelect={handleStatusSelect}
          placeholder="Search status..."
          title="Status"
        />

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="h-8 px-2 lg:px-3" onClick={clearAllFilters}>
            Reset
            <X className="ml-2 size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
