import {
  PatchRequest,
  PatchResponse,
} from "./patch.types.js";

export interface PatchService {
  generatePatch(
    request: PatchRequest
  ): Promise<PatchResponse>;
}