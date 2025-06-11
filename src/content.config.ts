import ContentConfigUtils from './scripts/utils/contentConfigUtils';
import { z } from 'astro:content';

var collection = ContentConfigUtils.Instance
collection.addZodObject('_framework_minecraft',z.object({ 
    version: z.string(),
    loader: z.enum(['forge','fabric','neoforge'])
                .nullable()
                .default('forge')
}))
collection.getCollections()

export const collections = collection.getCollections();
