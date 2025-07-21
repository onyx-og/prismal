import ComponentProps from "../Component";
import React, { useMemo, useRef, useState } from "react";

/**
 * https://stackoverflow.com/a/79042186/1623725 for drawing pie slices
 * https://stackoverflow.com/a/67299291/1623725 for adding text in them
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
interface SliceLabelProps {
	text: string,
	bgPath: SVGPathElement,
}
const SliceLabel: React.FC<SliceLabelProps> = (props) => {
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
interface SliceProps {
	labelText?: string, cx: number, cy: number, radius: number,
	fromAngle: number, toAngle: number,
	color: string
}
const Slice: React.FC<SliceProps> = (props) => {
	const { labelText, cx, cy, radius, fromAngle, toAngle, color } = props;
	const pathRef = useRef<SVGPathElement | null>(null)
	const [refSet, markRefSet] = useState(false)

	const refSetter = React.useCallback((node: SVGPathElement | null) => {
		if (pathRef.current) {
			//
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
const Pie: React.FC<PieChartProps> = (props) => {
	const { 
		size = 220, data, className,
		name
	} = props;

	let style: { [key: string]: any } = {
		width: size, height: size
	};

	let pieClass = 'alenite-pie';
	if (className) pieClass = `${pieClass} ${className}`

	const slices = React.useMemo(() => {
		const result: React.ReactNode[] = [];
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