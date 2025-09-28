import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('characters', 'routes/characters.tsx'),
	route('character/:name', 'routes/character.tsx'),
	route('account', 'routes/account.tsx'),
] satisfies RouteConfig;
