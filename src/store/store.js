import Vue from "vue";
import Vuex from "vuex";
import Decimal from "decimal.js";

import nav from "./modules/nav.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		nav
	},

	state: {
		useSfx: true,

		energy: new Decimal(0),
		prevEnergy: new Decimal(0),
		totalNow: new Decimal(0),
		total: new Decimal(0),
		eff: new Decimal(1),

		evolveReq: new Decimal(1000),
		stage: 0,
		highestStage: 0,
		
		wisdom: new Decimal(1),
		ascensions: 0,
		
		automata: [
			{
				amount: new Decimal(0),
				eps: new Decimal(1),
				cost: new Decimal(1000),
				ocost: new Decimal(1000),
				unlocked: 0
			},
			{
				amount: new Decimal(0),
				eps: new Decimal(5),
				cost: new Decimal(100000), // 100K
				ocost: new Decimal(100000),
				unlocked: 1
			},
			{
				amount: new Decimal(0),
				eps: new Decimal(5),
				cost: new Decimal(10000000), // 10 Million
				ocost: new Decimal(10000000),
				unlocked: 2
			},
		],

		upgrades: [
			{
				level: new Decimal(1),
				effect: "More Energy Gain",
				cost: new Decimal(100),
				ocost: new Decimal(100),
				item: "gain"
			},
		]
	},

	mutations: {
		calcTotal(state) {
			if (state.energy.gt(state.prevEnergy)) {
				const diff = state.energy.minus(state.prevEnergy);
				state.total = state.total.plus(diff);
				state.totalNow = state.totalNow.plus(diff);
			}
			state.prevEnergy = state.energy;
		}
	},

	actions: {
		update(context) {
			context.commit("calcTotal");
		},
	}
});