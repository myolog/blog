import { icons } from "@iconify-json/fluent-emoji-flat"
import { getIconData, iconToSVG } from '@iconify/utils';




export default function (name: string, size: number | string = 24) { 
    var nsize: string = 24 + 'px'
    if (typeof size === 'string') {
        nsize = size
    } else if (typeof size === 'number') {
        size = Math.round(size);
        nsize = size.toString() + 'px'
    }

    const id = `fluent-emoji-flat:${name}`

    const iconData = getIconData(icons, name);
    if(!iconData) {
        console.warn(`Icon ${name} not found, falling back to placeholder`);
        // Return a fallback or empty string instead of throwing
        return `<span class="missing-icon">${name}</span>`;
    }
    const renderData = iconToSVG(iconData)
    const props = { ...renderData.attributes, ...{ width: nsize, height: nsize } }
    return `<svg xmlns='http://www.w3.org/2000/svg' ${Object.entries(props).map(([key, value]) => `${key}='${value}'`).join(' ')} 
            class="blog-icon" data-icon="${name}">
        <symbol id='${id}' viewBox='${props.viewBox}'>
            ${renderData.body}
        </symbol>
        <use href='#${id}' />
    </svg>
    ` 

}