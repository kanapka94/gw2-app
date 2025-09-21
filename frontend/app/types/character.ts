export interface Character {
	name: string;
	race: string;
	gender: string;
	profession: string;
	level: number;
	guild?: string;
	age: number;
	created: string;
	deaths: number;
	craftings: Array<{
		discipline: string;
		rating: number;
		active: boolean;
	}>;
	backstory: string[];
	wvw_abilities: any[];
	specializations: any[];
	training: any[];
	equipment: any[];
	recipes: number[];
	equipment_pvp: any;
	bags: any[];
	tools: any[];
	skills: any;
	build_tabs: any[];
	build_tabs_active_tab: number;
	build_tabs_active_build: number;
	title?: number;
	daily_crafting: any[];
	flags: string[];
	access: string[];
	last_modified: string;
	time_played: number;
}

export type CharactersResponse = string[];
