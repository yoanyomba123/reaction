import EditorPage from "./EditorPage"

export default EditorPage
import EditorPageContainer from "./EditorPageContainer"
import { registerComponent  } from "/imports/plugins/core/components/lib";

registerComponent("editorPage", EditorPageContainer)
