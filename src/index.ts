import { App, createApp } from "vue"
import app from "./App.vue";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Config, ConfigSchema, init, states } from "./state";
import { validate } from "jsonschema";
import { PluginMotionChartData, PluginMotionChartListData, DatasourceType, DataSource } from './api';

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
            const s = states[this.canvas];
            s.drillDown = this.drillDown.bind(this);
            s.drillUp = this.drillUp.bind(this);
            s.drillThrough = this.drillThrough.bind(this);
            s.relation = this.relation.bind(this);
            s.dataPointAction = this.dataPointAction.bind(this);
            s.existsSystemVar = this.existsSystemVar.bind(this);
            s.getSystemVarValue = this.getSystemVarValue.bind(this);
            s.setSystemVarValue = this.setSystemVarValue.bind(this);
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
        drillDown = () => { };
        drillUp = () => { };
        drillThrough = () => { };
        relation = () => { };
        dataPointAction = () => { };
        existsSystemVar = () => false;
        getSystemVarValue = () => '';
        setSystemVarValue = () => false;
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