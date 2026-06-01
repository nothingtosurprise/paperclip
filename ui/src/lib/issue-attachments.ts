import type { IssueAttachment } from "@paperclipai/shared";
import { isVideoContentType } from "./issue-output";

function normalizedContentType(attachment: Pick<IssueAttachment, "contentType">) {
  return attachment.contentType.toLowerCase().split(";")[0]?.trim() ?? "";
}

export function attachmentFilename(attachment: Pick<IssueAttachment, "id" | "originalFilename">) {
  return attachment.originalFilename ?? attachment.id;
}

export function attachmentOpenPath(
  attachment: Pick<IssueAttachment, "contentPath" | "openPath">,
) {
  return attachment.openPath ?? attachment.contentPath;
}

export function attachmentDownloadPath(
  attachment: Pick<IssueAttachment, "contentPath" | "downloadPath">,
) {
  return attachment.downloadPath ?? `${attachment.contentPath}?download=1`;
}

export function isImageAttachment(attachment: Pick<IssueAttachment, "contentType">) {
  return normalizedContentType(attachment).startsWith("image/");
}

export function isVideoAttachment(attachment: Pick<IssueAttachment, "contentType">) {
  return isVideoContentType(normalizedContentType(attachment));
}

export function isMarkdownAttachment(
  attachment: Pick<IssueAttachment, "contentType" | "originalFilename">,
) {
  const contentType = normalizedContentType(attachment);
  if (
    contentType === "text/markdown" ||
    contentType === "text/x-markdown" ||
    contentType === "application/markdown" ||
    contentType === "application/x-markdown"
  ) {
    return true;
  }

  const filename = (attachment.originalFilename ?? "").toLowerCase();
  return filename.endsWith(".md") || filename.endsWith(".markdown");
}
