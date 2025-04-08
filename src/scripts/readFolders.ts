import path from "path";
import fs from "fs";
import { z, type TypeOf } from "zod";

const frameworkPath = path.join(process.cwd(), "src/content/framework");

let frameworkFolders: string[] = [];
try {
    frameworkFolders = fs
        .readdirSync(frameworkPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    
        
} catch (error) {
    console.error("Error reading framework folders:", error);
}

enum folders {
    
}

const folderDataSchema = z.object({
    folders: z.array(z.string())
});

export default function (): TypeOf<typeof folderDataSchema> {
    return { folders: frameworkFolders };
}