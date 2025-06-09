import ContentConfigUtils from './scripts/utils/contentConfigUtils';
import { z } from 'astro:content';

var collection = ContentConfigUtils.Instance
collection.addZodObject('_framework_minecraft',z.object({ version: z.string() }))
collection.getCollections()

export const collections = collection.getCollections();
