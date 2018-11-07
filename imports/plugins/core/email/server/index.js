import "./i18n";
import { Emails } from "/lib/collections";

/**
 * Emails - Deny all client side ops
 */
Emails.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
