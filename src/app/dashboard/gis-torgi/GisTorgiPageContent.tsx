"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { CheckModule, getBatchChecks, getGistorgiChecks, useGistorgiBatchChecksStore, useGistorgiChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function GisTorgiPageContent() {
  const { items, isLoading, isInitialized, setChecks } =
    useGistorgiChecksStore();
  const { batches, isLoading: isBatchesLoading, isInitialized: areBatchesInitialized, setBatches, setLoading: setBatchesLoading } = useGistorgiBatchChecksStore();

  useEffect(() => {
    void getGistorgiChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
    setBatchesLoading(true);
    void getBatchChecks("/checks/gistorgi", CheckModule.GISTORGI).then(setBatches).finally(() => setBatchesLoading(false));
  }, [setBatches, setBatchesLoading, setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/torgi-figure.png">
      <CheckFormById configId="gistorgi" />
      <ChecksHistory
        items={items}
        batches={batches}
        isLoading={isLoading}
        isInitialized={isInitialized}
        isBatchesLoading={isBatchesLoading}
        areBatchesInitialized={areBatchesInitialized}
      />
    </DashboardPageFrame>
  );
}
