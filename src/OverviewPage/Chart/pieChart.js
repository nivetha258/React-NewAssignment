import React, { useState, useContext } from "react";
import { PageContext } from "../../Context";
import { PieChart, Pie, Sector} from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} width = {50} textAnchor={"middle"} fill={fill}>
        {"Categories"}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      {/* <label /> */}
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{payload.name}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`Count ${value}`}
        {/* {`(Rate ${(percent * 100).toFixed(2)}%)`} */}
      </text>
    </g>
  );
};

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { filters, setFilters } = useContext(PageContext);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  let array = props.data;
  const uniqueValues= [...new Set(array.map((item) => item.Category))];
  const valueCounts = array.reduce((counts, item) => {
    counts[item.Category] = (counts[item.Category] || 0) + 1;
    return counts;
  }, {});

  const data = uniqueValues.map((category) => {
    return { name: category, value: valueCounts[category] };
  });

  const filterCategory = (e) => {
    setFilters([
      {
        field: "Category",
        operator: "contains",
        value: e.name,
      },
    ]);
  };

  return (

    <PieChart width={400} height={450}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}      
        cx="50%"
        cy="50%"
        innerRadius={50}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
        onClick={filterCategory}
    
      />
    
    </PieChart>
  );
};

export default Example;
