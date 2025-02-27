import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const astro = await getCollection('framework_astro');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: astro.map((post) => ({
			...astro.data,
			link: `/framework/astro/${astro.id}/`,
		})),
	});
}
