import ComponentProps from "../Component";
import { useMemo, FC, useRef, useState, useCallback, ReactNode } from "react";

/**
 * https://stackoverflow.com/a/79042186/1623725 for drawing pie slices
 * https://stackoverflow.com/a/67299291/1623725 for adding text in them
 */

/**
 * @typedef {object} PieChartProps
 * @description Props for the Pie chart component.
 * @property {string} [name] A name for the chart.
 * @property {number} [size=220] The size (width and height) of the pie chart.
 * @property {Array<{name?: string, percentage: number, color?: string, label?: string}>} data The data for the pie chart slices.
 */
export interface PieChartProps extends ComponentProps {
	name?: string;
	size?: number;
	data: {
		name?: string;
		percentage: number;
		color?: string;
		label?: string;
	}[]
}

/**
 * @typedef {object} SliceLabelProps
 * @description Props for the SliceLabel component.
 * @property {string} text The text to display as the label.
 * @property {SVGPathElement} bgPath The path element of the slice background.
 */
interface SliceLabelProps {
	text: string,
	bgPath: SVGPathElement,
}

/**
 * @component SliceLabel
 * @description A component to render a text label centered within an SVG path.
 * @param {SliceLabelProps} props The component props.
 * @returns {React.ReactElement} The rendered text label.
 */
const SliceLabel: FC<SliceLabelProps> = (props) => {
	const { text, bgPath } = props;

	let bbox = bgPath.getBBox();
	let x = bbox.x + bbox.width / 2;
	let y = bbox.y + bbox.height / 2;

	return <text x={x.toString()} y={y.toString()}
		textAnchor="middle" className="label-text"
	>
		{text}
	</text>
}

/**
 * @typedef {object} SliceProps
 * @description Props for the Slice component.
 * @property {string} [labelText] The text label for the slice.
 * @property {number} cx The center x-coordinate of the pie.
 * @property {number} cy The center y-coordinate of the pie.
 * @property {number} radius The radius of the pie.
 * @property {number} fromAngle The starting angle of the slice.
 * @property {number} toAngle The ending angle of the slice.
 * @property {string} color The color of the slice.
 */
interface SliceProps {
	labelText?: string, cx: number, cy: number, radius: number,
	fromAngle: number, toAngle: number,
	color: string
}

/**
 * @component Slice
 * @description A component that renders a single slice of a pie chart.
 * @param {SliceProps} props The component props.
 * @returns {React.ReactElement} The rendered SVG path for the slice.
 */
const Slice: FC<SliceProps> = (props) => {
	const { labelText, cx, cy, radius, fromAngle, toAngle, color } = props;
	const pathRef = useRef<SVGPathElement>(null)
	const [refSet, markRefSet] = useState(false)

	/**
     * @function refSetter
     * @description A callback ref to get a reference to the SVG path element.
     * @param {SVGPathElement | null} node The SVG path DOM node.
     */
	const refSetter = useCallback((node: SVGPathElement | null) => {
		if (pathRef.current) {
			return;
		}

		if (node) {
			markRefSet(true)
		}

		// Save a reference to the node
		pathRef.current = node
	}, []);

	const d = useMemo(() => {
		var d = " M " + cx + " " + cy;
		for (var i = fromAngle; i <= toAngle; i++) {
			var radians = i * (Math.PI / 180);  //convert degree to radian
			var x = cx + Math.cos(radians) * radius;
			var y = cy + Math.sin(radians) * radius;

			d += " L " + x + " " + y;
		}
		d += " L " + cx + " " + cy;
		return d
	}, [cx, cy, fromAngle, toAngle, radius])


	const label = useMemo(() => {
		if (pathRef.current && labelText) {
			return <SliceLabel text={labelText} bgPath={pathRef.current} />
		}
	}, [refSet, labelText, d])

	return <>
		<path ref={refSetter} d={d} fill={color} stroke={color}></path>
		{label}
	</>
}

/**
 * @component Pie
 * @description A component to render a pie chart from a data array.
 * @param {PieChartProps} props The component props.
 * @returns {React.ReactElement} The rendered Pie chart SVG.
 * @example
 * <Pie data={[{ percentage: 50, color: 'red' }, { percentage: 50, color: 'blue' }]} />
 */
const Pie: FC<PieChartProps> = (props) => {
	const { 
		size = 220, data, className
	} = props;

	let style: { [key: string]: any } = {
		width: size, height: size
	};

	let pieClass = 'prismal-pie';
	if (className) pieClass = `${pieClass} ${className}`

	const slices = useMemo(() => {
		const result: ReactNode[] = [];
		let fromAngle = 0;
		for (var i = 0; i < data.length; i++) {
			const { name = `slice-${i}`, percentage, color = "#eee", label } = data[i];
			// check for configuration errors
			// percentage must be like 15, 20.5 etc..
			if (!(percentage >= 0 && percentage <= 100)) {
				throw new Error(`Configuration error. Check slice percentages. Got ${percentage}`)
			}
			const toAngle = fromAngle + 360 * (percentage / 100);

			const slice = <Slice labelText={label} cx={size / 2} cy={size / 2}
				radius={size - size * (55 / 100)} fromAngle={fromAngle} key={name}
				toAngle={toAngle} color={color} />

			result.push(slice);
			fromAngle = toAngle;
		}
		return result;
	}, [data, size]);

	return <svg xmlns="http://www.w3.org/2000/svg" style={style} className={pieClass}>
		{slices}
	</svg>
}

export default Pie;