import { composeWithTracker } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { getShortcutButtons } from "/imports/client-plugin-registry";

function composer(props, onData) {
  onData(null, {
    actionView: Reaction.getActionView(),
    data: props.data,
    buttons: getShortcutButtons(),
    actionViewIsOpen: Reaction.isActionViewOpen()
  });
}

export default function AdminContainer(component) {
  return composeWithTracker(composer)(component);
}
