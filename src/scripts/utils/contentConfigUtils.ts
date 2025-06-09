import path from 'path';
import fs from 'fs';
import type { ZodObject } from 'astro:schema';
import { defineCollection, type AnyEntryMap, type CollectionConfig } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const frameWorkSchema = z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
    pubDate: z.coerce.date()
})



export default class ContentConfigUtils {
    public static contentPath = '/src/content';
    public static Instance = new ContentConfigUtils(ContentConfigUtils.contentPath)

    private _path: string
    private zodObject: {[key: string]: ZodObject<any>} = {}
    constructor(contentRelativePath: string) {
        this._path = `${process.cwd()}${contentRelativePath}`
    }

    public getCollections(): {[id: string]: CollectionConfig<ZodObject<any>>}{
        var collections : {[id: string]: CollectionConfig<ZodObject<any>>} = {}

        this.getCollectionNameNPath().forEach(collection => {
            const additinalZodObject = this.zodObject[collection.name]
            const schema = additinalZodObject === undefined ? frameWorkSchema : frameWorkSchema
                .merge(additinalZodObject)

            collections[collection.name] = defineCollection({
                loader: glob({ base: `.${ContentConfigUtils.contentPath}/${collection.path}`, pattern: "**/*.{md,mdx}"}),
                schema
                
            })
        })

        return collections
    }

    public addZodObject(collectionName: keyof AnyEntryMap, obj: ZodObject<any>) {
        this.zodObject[collectionName] = obj
    }

    private getCollectionNameNPath(): { path: string, name: string}[] {
        return this.getCollectionNames(this._path,"").flatMap(x => ({ path: x, name: x.replaceAll('/','_') }))
    }

    private getCollectionNames(rootPath: string, relPath: string): string[] {
        const fullPath = path.join(rootPath, relPath);
        const entries = fs.readdirSync(fullPath, { withFileTypes: true });
        const subdirs = entries.filter(e => e.isDirectory());
        const files  = entries.filter(e => !e.isDirectory());
  
        const me = files.length > 0 ? [relPath] : [];
  
        const children = subdirs.flatMap(d =>
            this.getCollectionNames(rootPath, `${relPath}/${d.name}`)
        );
  
        return [...me, ...children];
    }
}