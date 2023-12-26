import client from "client";
import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
    console.log("CONTEXT: ", context);
    const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : '/';
    const {data} = await client.query({
        query: gql`
        query PageQuery($uri: String!) {
          nodeByUri(uri: $uri) {
            ... on Page {
              id
              title
              blocks(postTemplate: false)
              seo {
                title
                metaDesc
              }
            }
            ... on Property {
              id
              title
              blocks(postTemplate: false)
              seo {
                title
                metaDesc
              }
            }
          }
          acfOptionsMainMenu {
            mainMenu {
              menuItems {
                menuItem {
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                  label
                }
                items {
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                  label
                }
              }
              callToActionButton {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
            }
          },
        }`,
        variables: {
            uri,
        },
      })
      return {
        props: {
          seo: data.nodeByUri.seo,
          blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
          mainMenuItems: mapMainMenuItems(
            data.acfOptionsMainMenu.mainMenu.menuItems
          ),
          callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
          callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
        }
      }
}