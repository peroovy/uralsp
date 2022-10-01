export {}

declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (options: {
                        client_id: string,
                        allowed_parent_origin: string | string[],
                        callback: (response: googleRespond) => Promise<void>,
                    }) => void,
                    renderButton: (element: HTMLElement, options: {}) => void,
                }
            }
        };
        VK: {
            init: (options: {   apiId: number }) => void,
            Auth: {
                login: (callback: (response: vkRespond) => void, options: number) => void,
            },
            Widgets: {
                Auth: (element: string, options: { onAuth: (response: vkRespond) => void }) => void,
            }
        };
        telegramCallback: (response: telegramRespond) => void;
    }
}