import { composeWithTracker } from "@reactioncommerce/reaction-components";
import { QuickMenu } from "../components";
import { getShortcutButtons } from "/imports/client-plugin-registry";

function composer(props, onData) {
  onData(null, {
    buttons: getShortcutButtons()
  });
}

export default composeWithTracker(composer)(QuickMenu);
