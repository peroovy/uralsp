export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-62146d0b.js","imports":["_app/immutable/start-62146d0b.js","_app/immutable/chunks/index-af757d0f.js","_app/immutable/chunks/singletons-58bd1d19.js","_app/immutable/chunks/paths-9678c1af.js","_app/immutable/chunks/control-03134885.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js')
		],
		routes: [
			{
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "participant/ongoing",
				pattern: /^\/participant\/ongoing\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "participant/past",
				pattern: /^\/participant\/past\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "participant/requests",
				pattern: /^\/participant\/requests\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			},
			{
				id: "participant/upcoming",
				pattern: /^\/participant\/upcoming\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 12 },
				endpoint: null
			},
			{
				id: "admin/contests/[contestId]",
				pattern: /^\/admin\/contests\/([^/]+?)\/?$/,
				names: ["contestId"],
				types: [null],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "admin/requests/[application]",
				pattern: /^\/admin\/requests\/([^/]+?)\/?$/,
				names: ["application"],
				types: [null],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "contests/apply/[application]",
				pattern: /^\/contests\/apply\/([^/]+?)\/?$/,
				names: ["application"],
				types: [null],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "admin/[admin]",
				pattern: /^\/admin\/([^/]+?)\/?$/,
				names: ["admin"],
				types: [null],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "info/[info]",
				pattern: /^\/info\/([^/]+?)\/?$/,
				names: ["info"],
				types: [null],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "admin/[adminId]/users/[...q]",
				pattern: /^\/admin\/([^/]+?)\/users(?:\/(.*))?\/?$/,
				names: ["adminId","q"],
				types: [null,null],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
