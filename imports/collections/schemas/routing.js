import SimpleSchema from "simpl-schema";
import { registerSchema } from "@reactioncommerce/schemas";

/**
 * @name RedirectRule
 * @memberof Schemas
 * @type {SimpleSchema}
 * @property {String} [_id]
 * @property {String} from
 * @property {String} to
 * @property {Number} [status=301]
 * @property {Boolean} [enabled=true]
 */
export const RedirectRule = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
    label: "Redirect rule ID"
  },
  from: {
    type: String,
    index: 1,
    label: "Redirect from"
  },
  to: {
    type: String,
    label: "Redirect to"
  },
  status: {
    type: SimpleSchema.Integer,
    optional: true,
    defaultValue: 301,
    label: "Status"
  },
  enabled: {
    type: Boolean,
    index: 1,
    optional: true,
    defaultValue: true,
    label: "Is enabled"
  }
});

registerSchema("RedirectRule", RedirectRule);
