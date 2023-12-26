import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { getSEO } from "utils/getSEO";

export default async function Home(){
    const data = await getPage("/");

    return <BlockRenderer blocks={data} />;
}

export async function generateMetadata(){
    const seo = await getSEO("/");
    return {
        title: seo?.title || "",
        description: seo?.metaDesc || "",
    }
}

