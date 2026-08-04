import React, {
  useState,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
  ReactNode,
  useMemo,
  useCallback,
  useRef
} from 'react';
import './index.scss';
import propsMapImport from './props-map.json';
import Button from '../Button';
import TextInput from '../Form/TextInput';
import Select from '../Form/Select';
import Toggle from '../Form/Toggle';
import Range from '../Form/Range';

// Cast imported JSON to typed structure
const propsMap = propsMapImport as Record<
  string,
  {
    displayName: string;
    props: Array<{
      name: string;
      type: string;
      controlType: string;
      isOptional: boolean;
      options?: Array<string | number>;
      description: string;
    }>;
  }
>;

// Base styling properties to group into "Styles" tab
const STYLE_PROPS = ['elevation', 'borderRadius', 'accent', 'accentLight', 'accentDark'];

interface ComponentState {
  name: string;
  displayName: string;
  props: Record<string, any>;
  controls: Array<{
    name: string;
    type: string;
    controlType: string;
    isOptional: boolean;
    options?: Array<string | number>;
    description: string;
  }>;
}

interface SandboxControlFieldProps {
  ctrl: {
    name: string;
    type: string;
    controlType: string;
    isOptional: boolean;
    options?: Array<string | number>;
    description: string;
  };
  currentValue: any;
  onPropChange: (name: string, value: any) => void;
}

// Separate memoized component for rendering stable controls
const SandboxControlField: React.FC<SandboxControlFieldProps> = React.memo(({ ctrl, currentValue, onPropChange }) => {
  // Callback is guaranteed stable since onPropChange is stable and ctrl.name is static
  const handleChange = useCallback((val: any) => {
    onPropChange(ctrl.name, val);
  }, [ctrl.name, onPropChange]);

  const selectOptions = useMemo(() => {
    if (!ctrl.options) return [];
    return ctrl.options.map((opt) => ({
      value: String(opt),
      element: String(opt),
      selected: String(opt) === String(currentValue)
    }));
  }, [ctrl.options, currentValue]);

  return (
    <div className="sandbox-control-group">
      <label htmlFor={`ctrl-${ctrl.name}`}>{ctrl.name}</label>

      {ctrl.controlType === 'boolean' ? (
        <Toggle
          id={`ctrl-${ctrl.name}`}
          type="switch"
          checked={!!currentValue}
          onChange={handleChange}
        />
      ) : ctrl.controlType === 'number' ? (
        <Range
          id={`ctrl-${ctrl.name}`}
          min={ctrl.name === 'elevation' ? 0 : 0}
          max={ctrl.name === 'elevation' ? 4 : 100}
          step={1}
          value={Number(currentValue) || 0}
          showIndicator
          onChange={handleChange}
        />
      ) : ctrl.controlType === 'select' && ctrl.options ? (
        <Select
          id={`ctrl-${ctrl.name}`}
          options={selectOptions}
          onChange={handleChange}
        />
      ) : (
        <TextInput
          id={`ctrl-${ctrl.name}`}
          value={String(currentValue !== undefined ? currentValue : '')}
          placeholder={`Enter ${ctrl.name}...`}
          onChange={handleChange}
        />
      )}

      {ctrl.description && <p className="prop-desc">{ctrl.description}</p>}
    </div>
  );
});

export interface SandboxProps {
  children: ReactNode;
}

/**
 * @component Sandbox
 * @description A live prop-editing playground: clones its children with editable props driven by a
 * schema (props-map.json) generated from the package's exported `*Props` interfaces. Used in docs to
 * let readers tweak a component's props and see the result update in place.
 * @param {SandboxProps} props The component props.
 * @returns {React.ReactElement} The rendered Sandbox component.
 * @example
 * <Sandbox>
 *   <Button type="primary">Primary Button</Button>
 * </Sandbox>
 */
const Sandbox: React.FC<SandboxProps> = ({ children }) => {
  const [componentsState, setComponentsState] = useState<ComponentState[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'props' | 'styles'>('props');

  // Parse children and initialize state
  const validChildren = useMemo(() => {
    return Children.toArray(children).filter(isValidElement);
  }, [children]);

  // Extract key identifiers for children to check if the child structure changed
  const childrenStructureKey = useMemo(() => {
    return validChildren
      .map((child, idx) => {
        const typeObj = child.type as any;
        const name = typeObj?.displayName || typeObj?.name || 'Component';
        return `${name}-${idx}`;
      })
      .join('|');
  }, [validChildren]);

  useEffect(() => {
    if (validChildren.length === 0) return;

    const initialState = validChildren.map((child) => {
      // Introspect name
      const typeObj = child.type as any;
      const rawName = typeObj.displayName || typeObj.name || 'Component';

      // Clean name from MDX wraps or wrappers if necessary (Sandbox is still used from .mdx docs
      // pages, where component types can arrive wrapped as MDXCreateElement).
      const name = rawName.replace(/^MDXCreateElement$/, '');

      // Look up schema
      const schema = propsMap[name] || { displayName: name, props: [] };
      const controls = schema.props;

      // Extract initial props passed to React element
      const initialProps = { ...(child.props as any) };

      // Consolidate full state of props, filling with defaults from schema where missing
      const propsState: Record<string, any> = {};

      controls.forEach((ctrl) => {
        if (initialProps[ctrl.name] !== undefined) {
          propsState[ctrl.name] = initialProps[ctrl.name];
        } else {
          // Determine logical defaults for optional inputs
          if (ctrl.controlType === 'boolean') {
            propsState[ctrl.name] = false;
          } else if (ctrl.controlType === 'number') {
            propsState[ctrl.name] = ctrl.name === 'elevation' ? 0 : 0;
          } else if (ctrl.controlType === 'select' && ctrl.options) {
            propsState[ctrl.name] = ctrl.options[0];
          } else {
            propsState[ctrl.name] = '';
          }
        }
      });

      // Special fallback if children is text content and editable
      if (typeof initialProps.children === 'string' && !propsState.children) {
        propsState.children = initialProps.children;
        if (!controls.find((c) => c.name === 'children')) {
          controls.push({
            name: 'children',
            type: 'ReactNode',
            controlType: 'string',
            isOptional: true,
            description: 'The text content of the element.'
          });
        }
      }

      return {
        name,
        displayName: schema.displayName || name,
        props: propsState,
        controls
      };
    });

    setComponentsState(initialState);
    setSelectedIdx(0);
  }, [childrenStructureKey]);

  // Keep a stable mutable reference of the current selected index to prevent stale closures in handlePropChangeStable
  const selectedIdxRef = useRef(selectedIdx);
  useEffect(() => {
    selectedIdxRef.current = selectedIdx;
  }, [selectedIdx]);

  // Completely reference-stable property change dispatcher
  const handlePropChangeStable = useCallback((propName: string, value: any) => {
    setComponentsState((prev) => {
      const activeIdx = selectedIdxRef.current;
      const copy = [...prev];
      if (copy[activeIdx]) {
        copy[activeIdx] = {
          ...copy[activeIdx],
          props: {
            ...copy[activeIdx].props,
            [propName]: value
          }
        };
      }
      return copy;
    });
  }, []);

  const activeComp = componentsState[selectedIdx];

  // Group active controls into Properties vs Styles & Accents
  const { propControls, styleControls } = useMemo(() => {
    if (!activeComp) return { propControls: [], styleControls: [] };
    const propControls = activeComp.controls.filter((ctrl) => !STYLE_PROPS.includes(ctrl.name));
    const styleControls = activeComp.controls.filter((ctrl) => STYLE_PROPS.includes(ctrl.name));
    return { propControls, styleControls };
  }, [activeComp]);

  return (
    <div className="prismal-sandbox">
      {/* Visual Canvas Panel */}
      <div className="sandbox-canvas">
        {validChildren.map((child, idx) => {
          const compState = componentsState[idx];
          if (!compState) return child;

          // Merge currently configured props back into the element clone
          const elementProps = { ...compState.props };

          // Build a cloned element with the updated props
          const clonedChild = cloneElement(child, elementProps);
          const isSelected = selectedIdx === idx;

          return (
            <div
              key={idx}
              className={`sandbox-child-wrapper ${isSelected ? 'is-selected' : ''}`}
              onClick={() => setSelectedIdx(idx)}
            >
              <fieldset className="sandbox-fieldset">
                <legend className="sandbox-legend">
                  <span className="component-badge">{compState.displayName}</span>
                </legend>

                {/* Floating focus switch button */}
                <div className="sandbox-action-btn">
                  <Button
                    type="text"
                    iconName="pencil"
                    title={`Edit ${compState.displayName}`}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      setSelectedIdx(idx);
                    }}
                  />
                </div>

                <div className="sandbox-child-content">{clonedChild}</div>
              </fieldset>
            </div>
          );
        })}
      </div>

      {/* Control Sidebar Panel */}
      <div className="sandbox-controls-panel">
        {activeComp ? (
          <>
            <div className="sandbox-controls-header">
              <h3>Configure {activeComp.displayName}</h3>
              <p>Tailor real-time property configurations</p>
            </div>

            {/* Custom Sliding Tab Selector */}
            <div className="sandbox-tabs-nav">
              <button
                className={`sandbox-tab-btn ${activeTab === 'props' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('props')}
              >
                Properties
              </button>
              <button
                className={`sandbox-tab-btn ${activeTab === 'styles' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('styles')}
              >
                Styles & Accents
              </button>
            </div>

            {/* Render selected tab panel */}
            <div className="sandbox-form-grid">
              {(activeTab === 'props' ? propControls : styleControls).length > 0 ? (
                (activeTab === 'props' ? propControls : styleControls).map((ctrl) => {
                  const currentValue = activeComp.props[ctrl.name];

                  return (
                    <SandboxControlField
                      key={`${activeComp.displayName}-${ctrl.name}`}
                      ctrl={ctrl}
                      currentValue={currentValue}
                      onPropChange={handlePropChangeStable}
                    />
                  );
                })
              ) : (
                <div className="sandbox-empty-state">No controls in this category.</div>
              )}
            </div>
          </>
        ) : (
          <div className="sandbox-empty-state">Select a component to begin editing.</div>
        )}
      </div>
    </div>
  );
};

export default Sandbox;
