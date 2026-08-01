import { bankruptcyConfig } from "../checks/bankruptcy/config";
import { fsspConfig } from "../checks/fssp/config";
import { gibddConfig } from "../checks/gibdd/config";
import { gistorgiConfig } from "../checks/gistorgi/config";
import { innConfig } from "../checks/inn/config";

export const checkConfigs = [
  fsspConfig,
  gibddConfig,
  gistorgiConfig,
  bankruptcyConfig,
  innConfig,
];

export {
  bankruptcyConfig,
  fsspConfig,
  gibddConfig,
  gistorgiConfig,
  innConfig,
};
