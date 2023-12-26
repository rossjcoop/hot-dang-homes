import { NextResponse } from 'next/server';

export async function POST(req) {

    try {
        const filters = await req.json();

        let hasParkingFilter = ``;
        let petFriendlyFilter = ``;
        let minPriceFilter = ``;
        let maxPriceFilter = ``;

        if(filters.hasParking) {
            hasParkingFilter = `
            {
                key: "parking"
                compare: EQUAL_TO
                value: "1"
            },
            `
        }

        if(filters.petFriendly) {
            petFriendlyFilter = `
            {
                key: "pet_friendly"
                compare: EQUAL_TO
                value: "1"
            },
            `
        }

        if(filters.minPrice) {
            minPriceFilter = `
            {
                key: "price"
                compare: GREATER_THAN_OR_EQUAL_TO
                value:"${filters.minPrice}"
                type: NUMERIC
            },
            `
        }

        if(filters.maxPrice) {
            maxPriceFilter = `
            {
                key: "price"
                compare: LESS_THAN_OR_EQUAL_TO
                value:"${filters.maxPrice}"
                type: NUMERIC
            },
            `
        }

        const response = await fetch(process.env.WP_GRAPHQL_URL, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                query: `
                    query GetAllPropertiesQuery {
                        properties(where: {
                            offsetPagination: {offset: ${((filters.page || 1) - 1) * 3}, size: 3},
                            metaQuery: {
                                relation: AND
                                metaArray: [
                                    ${petFriendlyFilter}
                                    ${hasParkingFilter}
                                    ${minPriceFilter}
                                    ${maxPriceFilter}
                                ]
                            }
                        })          
                        {
                            nodes {
                                id
                                uri
                                title
                                featuredImage {
                                    node {
                                        altText
                                        sourceUrl
                                        uri
                                    }
                                }
                                propertyFeatures {
                                    bathrooms
                                    bedrooms
                                    parking
                                    petFriendly
                                    price
                                }
                                databaseId
                            }
                            pageInfo {
                                offsetPagination {
                                total
                                }
                            }
                        }
                        
                    }
                `
            })
        })

        const {data} = await response.json();
        return NextResponse.json({
            total: data.properties.pageInfo.offsetPagination.total,
            properties: data.properties.nodes,
        });
        
    } catch (e) {
        console.log("ERROR: ", e);
    }
}