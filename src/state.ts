import { reactive } from "vue";
import { JSAPI, apimock } from "./api";
import { Schema } from "jsonschema";

export type State = JSAPI & {
    config?: Config;
    // type here your app state.
};

export type Config = {
    // type here your config in plugin.
};

export const ConfigSchema: Schema = {
    // type here your config-schema in plugin
}

export const init = (): State => ({
    ...apimock(),
    // type here your app initial state.
});

export const states: { [canvas in string]: State } = reactive({});