import { createElement, Fragment } from "react";
import baseUrl from "../../config/baseUrl";

const blockedTags = new Set(["script", "style", "iframe", "object", "embed", "svg", "form", "input", "button"]);
const allowedTags = new Set(["p", "h1", "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "strong", "em", "br", "a", "img", "div"]);

const safeUrl = (value, base) => {
  if (!value) return null;
  try {
    const url = new URL(value, base);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
};

const renderNode = (node, key) => {
  if (node.nodeType === 3) return node.textContent;
  if (node.nodeType !== 1) return null;

  const tag = node.tagName.toLowerCase();
  if (blockedTags.has(tag)) return null;
  const children = Array.from(node.childNodes).map((child, index) => renderNode(child, index));
  if (!allowedTags.has(tag)) return createElement(Fragment, { key }, children);
  if (tag === "br") return createElement("br", { key });

  if (tag === "a") {
    const href = safeUrl(node.getAttribute("href"), window.location.origin);
    return href
      ? createElement("a", { key, href, target: "_blank", rel: "noopener noreferrer", className: "font-semibold text-main underline" }, children)
      : createElement(Fragment, { key }, children);
  }

  if (tag === "img") {
    const src = safeUrl(node.getAttribute("src"), baseUrl);
    return src ? createElement("img", { key, src, alt: node.getAttribute("alt") || "", className: "my-6 w-full rounded-2xl" }) : null;
  }

  const classNames = {
    p: "leading-8 text-text",
    h1: "mt-8 text-2xl font-semibold text-heading",
    h2: "mt-8 text-2xl font-semibold text-heading",
    h3: "mt-6 text-xl font-semibold text-heading",
    h4: "mt-5 text-lg font-semibold text-heading",
    ul: "list-disc space-y-2 pl-6 text-text",
    ol: "list-decimal space-y-2 pl-6 text-text",
    blockquote: "border-l-4 border-main pl-5 italic text-text",
  };

  return createElement(tag, { key, className: classNames[tag] }, children);
};

const BlogArticleBody = ({ html }) => {
  if (!html) return null;
  const document = new DOMParser().parseFromString(html, "text/html");
  return <div className="space-y-4">{Array.from(document.body.childNodes).map((node, index) => renderNode(node, index))}</div>;
};

export default BlogArticleBody;
