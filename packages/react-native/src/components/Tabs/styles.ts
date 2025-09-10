import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../styles/vars'; // Adjust the import path

const styles = StyleSheet.create({
  // .prismal-tabs-container
  tabsContainer: {
    // This is a top-level container, no style in the original was applied directly here, but we may need one
  },

  // .prismal-tabs
  tabs: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.light,
    gap: SIZES.gap, // Replaced 1rem with SIZES.gap
    justifyContent: 'space-evenly',
    // The web has 'overflow-x: auto' which on mobile is a ScrollView
    // The 'overflow-y: clip' is default behavior in RN's View
    borderRadius: SIZES.borderRadius,
    // RN doesn't support 'font-family' directly without linking a custom font
    // font-family: vars.$font-body;
  },

  // To replicate the `::after` pseudo-element for the bottom line
  // We'll create a separate style object for a dedicated View component.
  tabsBottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.grey,
  },

  // .prismal-tab-container
  tabContainer: {
    flex: 1, // `flex: 1` takes up available space, similar to `flex: 1` on the web
    position: 'relative',
  },

  // .prismal-tab
  tab: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: SIZES.minTabWidth, // 6rem becomes a dp value
    height: SIZES.tabHeight,    // 2.5rem becomes a dp value
    borderRadius: SIZES.borderRadius,
    color: COLORS.dark, // Color for the Text component
    // 'cursor: pointer' is a web-specific property. In RN, you would use a TouchableOpacity
  },
  
  // &.selected { ... }
  tabSelected: {
    color: COLORS.primary, // Selected color for the Text component
    fontWeight: 'bold',
  },

  // &.selected::after { ... }
  // We need a separate component for this, positioned absolutely inside the tab
  selectedIndicator: {
    position: 'absolute',
    bottom: 0,
    width: SIZES.selectedIndicatorWidth, // 4rem becomes a dp value
    height: SIZES.selectedIndicatorHeight,
    backgroundColor: COLORS.primary,
    // To center the indicator, you need to use `alignSelf: 'center'`
    alignSelf: 'center',
  },

  // .prismal-tab-content
  tabContent: {
    padding: SIZES.padding, // 1rem becomes a dp value
  },
});

export default styles;