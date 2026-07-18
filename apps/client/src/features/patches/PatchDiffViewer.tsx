import ReactDiffViewer from "react-diff-viewer-continued";

export default function PatchDiffViewer({
  patch,
}: any) {
  return (
    <ReactDiffViewer
      oldValue={patch.originalCode}
      newValue={patch.patchedCode}
      splitView
    />
  );
}