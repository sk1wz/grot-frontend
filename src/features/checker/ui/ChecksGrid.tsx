"use client";

import { checkConfigs } from "../model/configs";
import { CheckCard } from "./CheckCard";

type ChecksGridProps = {
  availableFeatures?: string[];
};

export function ChecksGrid({ availableFeatures = [] }: ChecksGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {checkConfigs.map((config) => (
        <CheckCard
          key={config.id}
          config={config}
          availableFeatures={availableFeatures}
        />
      ))}
    </div>
  );
}
