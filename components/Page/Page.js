import { BlockRenderer } from "components/BlockRenderer"
import { MainMenu } from "components/MainMenu"
import Head from "next/head";

export const Page = (props) => {
    console.log("PAGE PROPS:", props);

    return (
        <div>
            <Head>
                <title>{props.seo.title}</title>
                <meta name="description" content={props.seo.metaDesc} />
            </Head>
            <MainMenu 
                items={props.mainMenuItems}
                callToActionDestination={props.callToActionDestination}
                callToActionLabel={props.callToActionLabel}
            />
            <BlockRenderer blocks={props.blocks}/>
        </div>
    );
} 