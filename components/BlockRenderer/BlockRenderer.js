import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { theme } from "theme";
import Image from "next/image";
import { PropertySearch } from "components/PropertySearch";
import { FormspreeForm } from "components/FormspreeForm";
import { PropertyFeatures } from "components/PropertyFeatures";

export const BlockRenderer = ({blocks}) => {
    return blocks.map(block => {
        console.log("BLOCK: ", block);
        switch(block.name) {
            case 'core/cover' : {
                
                return (
                    <Cover 
                        key={block.id} 
                        background={block.attributes.url}>
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Cover>
                );
            }
            case 'core/post-title' :
            case 'core/heading' : {
                return (
                    <Heading 
                        key={block.id} 
                        textAlign={block.attributes.textAlign} 
                        level={block.attributes.level} 
                        content={block.attributes.content} 
                    />
                );
            }

            case 'core/paragraph' : {
                return (
                    <Paragraph 
                        key={block.id}
                        textAlign={block.attributes.textAlign}
                        content={block.attributes.content} 
                        textColor={
                            theme[block.attributes.textColor] ||
                            block.attributes.style?.color?.text
                        }
                    />
                );
            }
            case 'acf/ctabutton' : {
                return (
                    <CallToActionButton 
                        key={block.id} 
                        buttonLabel={block.attributes.data.label} 
                        destination={block.attributes.data.destination || "/"} 
                        align={block.attributes.data.align}
                    />
                );
            }
            case 'core/columns' : {
                return (
                    <Columns key={block.id} isStackedOnMobile={block.attributes.isStackedOnMobile}>
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Columns>
                );
            }

            case 'core/column' : {
                return (
                    <Column key={block.id}>
                        <BlockRenderer blocks={block.innerBlocks} width={block.attributes?.width} />
                    </Column>
                );
            }

            case 'core/image' : {
                return (
                    <Image 
                        key={block.id} 
                        src={block.attributes.url}
                        height={block.attributes.height}
                        width={block.attributes.width}
                        alt={block.attributes.alt || ""}
                    />
                )
            }

            case 'core/block' :
            case 'core/group' : {
                return <BlockRenderer key={block.id} blocks={block.innerBlocks} />
            }

            case 'acf/propertysearch' : {
                return <PropertySearch key={block.id} />
            }

            case 'acf/formspreeform' : {
                return <FormspreeForm key={block.id} formId={block.attributes.data.form_id} />
            }

            case 'acf/propertyfeatures' : {
                return <PropertyFeatures 
                            key={block.id} 
                            price={block.attributes.price} 
                            bathrooms={block.attributes.bathrooms}
                            bedrooms={block.attributes.bedrooms}
                            hasParking={block.attributes.hasParking}
                            petFriendly={block.attributes.petFriendly} 
                        />
            }

            default:
                console.log("UNKNOWN: ", block);
                return null;      
        }

        
    })
}