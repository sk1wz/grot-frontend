"use client";

import { useEffect } from "react";
import { CheckFormById } from "@/features/checker";
import { CheckModule, getBatchChecks, getTaxiChecks, useTaxiBatchChecksStore, useTaxiChecksStore } from "@/entities/check";
import { DashboardPageFrame } from "@/shared/ui";
import { ChecksHistory } from "@/widgets/checks-history";

export function TaxiPageContent() {
  const { items, isLoading, isInitialized, setChecks } = useTaxiChecksStore();
  const { batches, isLoading: isBatchesLoading, isInitialized: areBatchesInitialized, setBatches, setLoading: setBatchesLoading } = useTaxiBatchChecksStore();

  useEffect(() => {
    void getTaxiChecks().then((checks) => {
      if (checks) setChecks(checks);
    });
    setBatchesLoading(true);
    void getBatchChecks("/checks/taxi", CheckModule.TAXI).then(setBatches).finally(() => setBatchesLoading(false));
  }, [setBatches, setBatchesLoading, setChecks]);

  return (
    <DashboardPageFrame figureSrc="/checksImages/gibdd-figure.png">
      <CheckFormById configId="taxi" />
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
