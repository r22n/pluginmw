import { App, createApp } from "vue"
import app from "./App.vue";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Config, ConfigSchema, init, states } from "./state";
import { validate } from "jsonschema";
import { PluginMotionChartData, PluginMotionChartListData, DatasourceType, DataSource, apimock } from './api';

if (!window.JSPLUGIN) {
    window.JSPLUGIN = {};
}

window.JSPLUGIN[d_name] = {
    _class_: class {

        canvas: string;
        top: HTMLDivElement;
        size: MutationObserver;
        app: App<Element>;

        constructor(canvas: string) {
            this.canvas = canvas;
            const listen = document.getElementById(canvas) as HTMLCanvasElement;

            this.top = document.createElement('div');
            document.body.appendChild(this.top);

            this.size = new MutationObserver(() => {
                const t = this.top.style;
                const l = listen.style;

                t.position = 'absolute';
                t.left = l.left;
                t.top = l.top;
                t.width = l.width;
                t.height = l.height;
            });
            this.size.observe(listen, {
                attributes: true,
                attributeFilter: ['style']
            });

            states[canvas] = init();
            this.apidelcs();

            this.app = createApp(app, { state: states[canvas] });
            this.app.mount(this.top);
        }

        destroy() {
            this.app.unmount();
            delete states[this.canvas];
            this.size.disconnect();
            this.top.remove();
        }

        createChildren() {
            this.apibind();
        }

        setConfig(config: string) {
            if (!config.trim()) {
                console.warn('plugin ignores config: config is empty');
                return;
            }

            const s = states[this.canvas];
            try {
                const c: Config = JSON.parse(config);
                const v = validate(c, ConfigSchema);
                if (v.errors.length) {
                    throw new Error(`invalid config: missmatch schema:\n${v.errors.map(x => `${x.message} ${x.path}/${x.name}`).join('\n')}`);
                }
                s.config = c;
            } catch (e) {
                console.error(e);
            }
        }

        setData(data: PluginMotionChartListData | PluginMotionChartData, type: DatasourceType) {
            const s = states[this.canvas];
            s.datasource = { type, data } as DataSource;
        }

        // #region legacy 

        x = 0;
        y = 0;
        width = 0;
        height = 0;

        apidelcs() {
            Object.keys(apimock()).forEach(x => {
                Reflect.set(this, x, () => 0);
            });
        }
        apibind() {
            const s = states[this.canvas];
            Object.keys(apimock()).forEach(x => {
                const b = Reflect.get(this, x) as () => {};
                Reflect.set(s, x, b.bind(this));
            });
        }

        invalidateDisplayList = () => { };
        callLater = () => { };
        updateDisplayList() { }

        getCreatedElements() {
            return [this.top];
        }
        onMove(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        onResize(x: number, y: number) {
            this.width = x;
            this.height = y;
        }
        onMouseEvent() { }
        onKeyboardEvent() { }

        //#endregion
    }
};