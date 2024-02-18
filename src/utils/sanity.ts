import { useSanityClient } from "@sanity/astro";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Section[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Section> {
  return await useSanityClient().fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getSection(slug: string): Promise<Section> {
  return await useSanityClient().fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
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
}
