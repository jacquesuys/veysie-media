import { useSanityClient } from "@sanity/astro";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getSection(slug: string): Promise<Section> {
  return await useSanityClient().fetch(
    groq`*[_type == "section" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface Section {
  _type: "section";
  _createdAt: string;
  title: string;
  slug: Slug;
  heading?: string;
  subheading?: string;
  mainImage?: ImageAsset;
  body?: PortableTextBlock[];
  cite?: string;
  quote?: string;
}
