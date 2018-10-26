import { assocInternalId, assocOpaqueId, decodeOpaqueIdForNamespace, encodeOpaqueId } from "./id";
import { namespaces } from "@reactioncommerce/reaction-graphql-utils";

export const assocRedirectRuleInternalId = assocInternalId(namespaces.RedirectRule);
export const assocRedirectRuleOpaqueId = assocOpaqueId(namespaces.RedirectRule);
export const decodeRedirectRuleOpaqueId = decodeOpaqueIdForNamespace(namespaces.RedirectRule);
export const encodeRedirectRuleOpaqueId = encodeOpaqueId(namespaces.RedirectRule);
