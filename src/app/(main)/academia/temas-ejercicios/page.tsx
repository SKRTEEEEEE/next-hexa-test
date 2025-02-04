import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import {ejercicios} from "#site/content"
import { Tag } from "@/components/academia/tag";

export const metadata: Metadata = {
    title: "Temas ejercicios",
    description: "Temas de ejercicios disponibles"
}

export default async function TemasPage() {
    const tags = getAllTags(ejercicios)
    const sortedTags = sortTagsByCount(tags)

    return <div className="container max-w-4xl py-6 pl:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
            <div className="flex-1 space-y-4">
                <h1 className="inline-block font-black text-4xl lg:text-5xl">Tags</h1>
            </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-wrap gap-2">
        {sortedTags?.map(tag=><Tag tag={tag} count={tags[tag]} key={tag}/>)}</div>
    </div>
}