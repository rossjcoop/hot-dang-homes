import {v4 as uuid} from 'uuid';

export const cleanAndTransformBlocks = (blocksJSON) => {
    /**
     * We need to convert the blocks object to stringfy JSON back to 
     * an JSON object. This because what is coming from the Apollo client
     * is immutable from the in-memory cache.
     */
    const blocks = JSON.parse(JSON.stringify(blocksJSON));

    const assignIds = (b) => {
        b.forEach(block => {
            block.id = uuid();
            if (block.innerBlocks?.length) {
                assignIds(block.innerBlocks);
            }
        })
    }

    assignIds(blocks);

    return blocks;

}