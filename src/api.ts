
export type JSAPI = {
    drillDown: (type: DrilldownType, itemData: DrilldownParam) => void;
    drillUp: (autoUp: boolean) => void;
    drillThrough: (itemData: DrilldownParam) => void;
    relation: (type: DrilldownType, itemData: DrilldownParam) => void;
    dataPointAction: (itemData: DrilldownParam) => void;
    existsSystemVar: (name: string) => boolean;
    getSystemVarValue: (name: string) => string;
    setSystemVarValue: (name: string) => boolean;
    datasource?: DataSource;
};

export const apimock = (): JSAPI => ({
    drillDown: () => { },
    drillUp: () => { },
    drillThrough: () => { },
    relation: () => { },
    dataPointAction: () => { },
    existsSystemVar: () => false,
    getSystemVarValue: () => '',
    setSystemVarValue: () => false,
});

export type DrilldownType = '' | 'both' | 'category' | 'series';
export type DrilldownParam = {
    category: { name: string, value: string }[];
    series: { name: string, value: string }[];
    summary: { name: string }[];
};

export type DataSource = {
    type: 'mcdata';
    data: PluginMotionChartData;
} | {
    type: 'fdata' | 'tdata';
    data: PluginMotionChartListData;
};
export type DatasourceType = 'mcdata' | 'fdata' | 'tdata';

export type PluginMotionChartData = {
    rowDefinitionList: PluginItemDefinition[];
    colDefinitionList: PluginItemDefinition[];
    rowDataList: PluginItemData[];
    colDataList: PluginItemData[];
    summaryDataList: PluginSummaryData[];
    pointDataList: PluginPointData[];
};
export type PluginItemDefinition = {
    name: string;
    format: string;
    type: string;
    exType: string;
    sortType: string;
};
export type PluginItemData = {
    itemValue: PluginItemValue[];
};
export type PluginItemValue = {
    definition: PluginItemDefinition;
    value: string;
};
export type PluginSummaryData = {
    value: string;
    sumType: string;
    exType: string;
    format: string;
    disp: boolean;
    visible: boolean;
};
export type PluginPointData = {
    rowData: PluginItemData;
    colData: PluginItemData;
    summaryData: PluginSummaryData;
    value: number;
};
export type PluginMotionChartListData = {
    dataArray: String[][];
    itemDefinitionList: PluginItemDefinition[];
};