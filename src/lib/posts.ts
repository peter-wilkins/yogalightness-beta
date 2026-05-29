import type { CollectionEntry } from "astro:content";

export function visiblePosts(posts: CollectionEntry<"posts">[]) {
  return posts.filter((post) => import.meta.env.PUBLIC_SHOW_DRAFTS === "true" || !post.data.draft);
}
