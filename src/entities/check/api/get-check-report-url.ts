import { baseURL } from "@/shared/api/config";

export type CheckReportFormat = "pdf" | "excel";

export function getCheckReportUrl(checkId: string, format: CheckReportFormat): string {
  return `${baseURL}/checks/report/${format}/${encodeURIComponent(checkId)}`;
}
