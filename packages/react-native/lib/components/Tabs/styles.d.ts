declare const styles: {
    tabsContainer: {};
    tabs: {
        flexDirection: "row";
        width: "100%";
        backgroundColor: string;
        gap: number;
        justifyContent: "space-evenly";
        borderRadius: number;
    };
    tabsBottomLine: {
        position: "absolute";
        bottom: number;
        left: number;
        right: number;
        height: number;
        backgroundColor: string;
    };
    tabContainer: {
        flex: number;
        position: "relative";
    };
    tab: {
        flexDirection: "column";
        justifyContent: "center";
        alignItems: "center";
        minWidth: number;
        height: number;
        borderRadius: number;
        color: string;
    };
    tabSelected: {
        color: string;
        fontWeight: "bold";
    };
    selectedIndicator: {
        position: "absolute";
        bottom: number;
        width: number;
        height: number;
        backgroundColor: string;
        alignSelf: "center";
    };
    tabContent: {
        padding: number;
    };
};
export default styles;
