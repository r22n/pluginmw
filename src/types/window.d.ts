interface Window {
    JSPLUGIN: PLUGINS;
};
type PLUGINS = {
    [name in string]?: PLUGIN;
};
type PLUGIN = {
    _class_: unknown;
};

declare const window: Window;
declare const d_name: string;