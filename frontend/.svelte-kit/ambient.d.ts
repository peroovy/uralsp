
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into public-facing code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const LESSOPEN: string;
	export const npm_config_hackrf_binary_host_mirror: string;
	export const USER: string;
	export const LC_TIME: string;
	export const npm_config_leveldown_binary_host_mirror: string;
	export const npm_config_user_agent: string;
	export const XDG_SESSION_TYPE: string;
	export const GIT_ASKPASS: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const npm_config_operadriver_cdnurl: string;
	export const npm_config_noproxy: string;
	export const HOME: string;
	export const CHROME_DESKTOP: string;
	export const OLDPWD: string;
	export const npm_config_couchbase_binary_host_mirror: string;
	export const npm_config_nodegit_binary_host_mirror: string;
	export const TERM_PROGRAM_VERSION: string;
	export const DESKTOP_SESSION: string;
	export const NVM_NODEJS_ORG_MIRROR: string;
	export const NVM_BIN: string;
	export const npm_config_fse_binary_host_mirror: string;
	export const npm_config_puppeteer_download_host: string;
	export const npm_package_json: string;
	export const NVM_INC: string;
	export const GNOME_SHELL_SESSION_MODE: string;
	export const GTK_MODULES: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const npm_config_electron_mirror: string;
	export const LC_MONETARY: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const npm_config_grpc_node_binary_host_mirror: string;
	export const npm_config_profiler_binary_host_mirror: string;
	export const npm_config_userconfig: string;
	export const npm_config_local_prefix: string;
	export const DBUS_STARTER_BUS_TYPE: string;
	export const SYSTEMD_EXEC_PID: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const COLORTERM: string;
	export const npm_config_fuse_bindings_binary_host_mirror: string;
	export const COLOR: string;
	export const NVM_DIR: string;
	export const npm_config_debug_binary_host_mirror: string;
	export const npm_config_metrics_registry: string;
	export const IM_CONFIG_PHASE: string;
	export const WAYLAND_DISPLAY: string;
	export const npm_config_node_tk5_binary_host_mirror: string;
	export const LOGNAME: string;
	export const npm_config_git4win_mirror: string;
	export const NVMW_NODEJS_ORG_MIRROR: string;
	export const _: string;
	export const npm_config_prefix: string;
	export const XDG_SESSION_CLASS: string;
	export const npm_config_registry: string;
	export const npm_config_gl_binary_host_mirror: string;
	export const npm_config_sqlite3_binary_site: string;
	export const USERNAME: string;
	export const TERM: string;
	export const npm_config_node_sqlite3_binary_host_mirror: string;
	export const npm_config_python_mirror: string;
	export const npm_config_rabin_binary_host_mirror: string;
	export const npm_config_cache: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const NVMW_NPM_MIRROR: string;
	export const NODIST_NODE_MIRROR: string;
	export const npm_config_disturl: string;
	export const npm_config_utf_8_validate_binary_host_mirror: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const SESSION_MANAGER: string;
	export const NVM_IOJS_ORG_MIRROR: string;
	export const PAPERSIZE: string;
	export const NODE: string;
	export const npm_package_name: string;
	export const XDG_MENU_PREFIX: string;
	export const LC_ADDRESS: string;
	export const NODEJS_ORG_MIRROR: string;
	export const GNOME_TERMINAL_SCREEN: string;
	export const GNOME_SETUP_DISPLAY: string;
	export const XDG_RUNTIME_DIR: string;
	export const GDK_BACKEND: string;
	export const DISPLAY: string;
	export const npm_config_sass_binary_site: string;
	export const LANG: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const LC_TELEPHONE: string;
	export const npm_config_zmq_prebuilt_binary_host_mirror: string;
	export const XMODIFIERS: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XAUTHORITY: string;
	export const LS_COLORS: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const GNOME_TERMINAL_SERVICE: string;
	export const TERM_PROGRAM: string;
	export const npm_config_leveldown_hyper_binary_host_mirror: string;
	export const npm_config_sodium_prebuilt_binary_host_mirror: string;
	export const npm_lifecycle_script: string;
	export const SSH_AGENT_LAUNCHER: string;
	export const SSH_AUTH_SOCK: string;
	export const GSETTINGS_SCHEMA_DIR: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const SHELL: string;
	export const LC_NAME: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const QT_ACCESSIBILITY: string;
	export const GDMSESSION: string;
	export const LESSCLOSE: string;
	export const NVMW_IOJS_ORG_MIRROR: string;
	export const LC_MEASUREMENT: string;
	export const npm_config_chromedriver_cdnurl: string;
	export const npm_config_flow_bin_binary_host_mirror: string;
	export const LC_IDENTIFICATION: string;
	export const npm_config_mknod_binary_host_mirror: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const QT_IM_MODULE: string;
	export const npm_config_phantomjs_cdnurl: string;
	export const npm_config_globalconfig: string;
	export const npm_config_init_module: string;
	export const PWD: string;
	export const npm_execpath: string;
	export const XDG_CONFIG_DIRS: string;
	export const IOJS_ORG_MIRROR: string;
	export const NVM_CD_FLAGS: string;
	export const DBUS_STARTER_ADDRESS: string;
	export const XDG_DATA_DIRS: string;
	export const npm_config_global_prefix: string;
	export const NODIST_IOJS_MIRROR: string;
	export const LC_NUMERIC: string;
	export const npm_config_utp_native_binary_host_mirror: string;
	export const npm_command: string;
	export const LC_PAPER: string;
	export const VTE_VERSION: string;
	export const INIT_CWD: string;
	export const EDITOR: string;
	export const VITE_API_URL: string;
	export const VITE_TELEGRAM_BOT: string;
	export const VITE_VK_CLIENT_ID: string;
	export const VITE_GOOGLE_CLIENT_ID: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {

}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * This module cannot be imported into public-facing code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		LESSOPEN: string;
		npm_config_hackrf_binary_host_mirror: string;
		USER: string;
		LC_TIME: string;
		npm_config_leveldown_binary_host_mirror: string;
		npm_config_user_agent: string;
		XDG_SESSION_TYPE: string;
		GIT_ASKPASS: string;
		npm_node_execpath: string;
		SHLVL: string;
		npm_config_operadriver_cdnurl: string;
		npm_config_noproxy: string;
		HOME: string;
		CHROME_DESKTOP: string;
		OLDPWD: string;
		npm_config_couchbase_binary_host_mirror: string;
		npm_config_nodegit_binary_host_mirror: string;
		TERM_PROGRAM_VERSION: string;
		DESKTOP_SESSION: string;
		NVM_NODEJS_ORG_MIRROR: string;
		NVM_BIN: string;
		npm_config_fse_binary_host_mirror: string;
		npm_config_puppeteer_download_host: string;
		npm_package_json: string;
		NVM_INC: string;
		GNOME_SHELL_SESSION_MODE: string;
		GTK_MODULES: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		npm_config_electron_mirror: string;
		LC_MONETARY: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		npm_config_grpc_node_binary_host_mirror: string;
		npm_config_profiler_binary_host_mirror: string;
		npm_config_userconfig: string;
		npm_config_local_prefix: string;
		DBUS_STARTER_BUS_TYPE: string;
		SYSTEMD_EXEC_PID: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		COLORTERM: string;
		npm_config_fuse_bindings_binary_host_mirror: string;
		COLOR: string;
		NVM_DIR: string;
		npm_config_debug_binary_host_mirror: string;
		npm_config_metrics_registry: string;
		IM_CONFIG_PHASE: string;
		WAYLAND_DISPLAY: string;
		npm_config_node_tk5_binary_host_mirror: string;
		LOGNAME: string;
		npm_config_git4win_mirror: string;
		NVMW_NODEJS_ORG_MIRROR: string;
		_: string;
		npm_config_prefix: string;
		XDG_SESSION_CLASS: string;
		npm_config_registry: string;
		npm_config_gl_binary_host_mirror: string;
		npm_config_sqlite3_binary_site: string;
		USERNAME: string;
		TERM: string;
		npm_config_node_sqlite3_binary_host_mirror: string;
		npm_config_python_mirror: string;
		npm_config_rabin_binary_host_mirror: string;
		npm_config_cache: string;
		GNOME_DESKTOP_SESSION_ID: string;
		NVMW_NPM_MIRROR: string;
		NODIST_NODE_MIRROR: string;
		npm_config_disturl: string;
		npm_config_utf_8_validate_binary_host_mirror: string;
		npm_config_node_gyp: string;
		PATH: string;
		SESSION_MANAGER: string;
		NVM_IOJS_ORG_MIRROR: string;
		PAPERSIZE: string;
		NODE: string;
		npm_package_name: string;
		XDG_MENU_PREFIX: string;
		LC_ADDRESS: string;
		NODEJS_ORG_MIRROR: string;
		GNOME_TERMINAL_SCREEN: string;
		GNOME_SETUP_DISPLAY: string;
		XDG_RUNTIME_DIR: string;
		GDK_BACKEND: string;
		DISPLAY: string;
		npm_config_sass_binary_site: string;
		LANG: string;
		XDG_CURRENT_DESKTOP: string;
		LC_TELEPHONE: string;
		npm_config_zmq_prebuilt_binary_host_mirror: string;
		XMODIFIERS: string;
		XDG_SESSION_DESKTOP: string;
		XAUTHORITY: string;
		LS_COLORS: string;
		VSCODE_GIT_IPC_HANDLE: string;
		GNOME_TERMINAL_SERVICE: string;
		TERM_PROGRAM: string;
		npm_config_leveldown_hyper_binary_host_mirror: string;
		npm_config_sodium_prebuilt_binary_host_mirror: string;
		npm_lifecycle_script: string;
		SSH_AGENT_LAUNCHER: string;
		SSH_AUTH_SOCK: string;
		GSETTINGS_SCHEMA_DIR: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		SHELL: string;
		LC_NAME: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		QT_ACCESSIBILITY: string;
		GDMSESSION: string;
		LESSCLOSE: string;
		NVMW_IOJS_ORG_MIRROR: string;
		LC_MEASUREMENT: string;
		npm_config_chromedriver_cdnurl: string;
		npm_config_flow_bin_binary_host_mirror: string;
		LC_IDENTIFICATION: string;
		npm_config_mknod_binary_host_mirror: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		QT_IM_MODULE: string;
		npm_config_phantomjs_cdnurl: string;
		npm_config_globalconfig: string;
		npm_config_init_module: string;
		PWD: string;
		npm_execpath: string;
		XDG_CONFIG_DIRS: string;
		IOJS_ORG_MIRROR: string;
		NVM_CD_FLAGS: string;
		DBUS_STARTER_ADDRESS: string;
		XDG_DATA_DIRS: string;
		npm_config_global_prefix: string;
		NODIST_IOJS_MIRROR: string;
		LC_NUMERIC: string;
		npm_config_utp_native_binary_host_mirror: string;
		npm_command: string;
		LC_PAPER: string;
		VTE_VERSION: string;
		INIT_CWD: string;
		EDITOR: string;
		VITE_API_URL: string;
		VITE_TELEGRAM_BOT: string;
		VITE_VK_CLIENT_ID: string;
		VITE_GOOGLE_CLIENT_ID: string;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: string]: string | undefined;
	}
}
