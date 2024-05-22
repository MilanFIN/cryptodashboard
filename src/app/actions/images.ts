"use server";
import path from "path";
import { promises as fs } from "fs";

export type IconSource = {
    symbol: string;
    content: string;
};

export async function getImages() {
    const imageDirectory = "./freeze/cryptocurrency-icons/svg/color/";
    const imageFilenames = await fs.readdir(imageDirectory);

    let images: IconSource[] = [];
    for (let i = 0; i < imageFilenames.length; i++) {
        let svg = await fs.readFile(
            `${imageDirectory}${imageFilenames[i]}`,
            "utf8"
        );
        images.push({
            symbol: imageFilenames[i].substring(0, imageFilenames[i].length -4),
            content: svg,
        });
    }

	return images;
}
