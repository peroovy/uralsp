export { matchers } from './client-matchers.js';

			export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12')];

			export const server_loads = [];

			export const dictionary = {
	"": [2],
	"participant/ongoing": [9],
	"participant/past": [10],
	"participant/requests": [11],
	"participant/upcoming": [12],
	"admin/contests/[contestId]": [5],
	"admin/requests/[application]": [6],
	"contests/apply/[application]": [7],
	"admin/[admin]": [4],
	"info/[info]": [8],
	"admin/[adminId]/users/[...q]": [3]
};

			export const hooks = {
				handleError: (({ error }) => { console.error(error) }),
			};