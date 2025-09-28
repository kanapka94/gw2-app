export interface Achievement {
	id: number;
	current: number;
	max: number;
	done: boolean;
	bits?: number[];
}

export interface BankItem {
	id: number;
	count: number;
	charges?: number;
	skin?: number;
	upgrades?: number[];
	infusions?: number[];
	binding?: string;
	bound_to?: string;
}

export interface AccountData {
	achievements: Achievement[];
	bank: BankItem[];
}
