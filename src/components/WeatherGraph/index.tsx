import { AxisBottom, AxisLeft } from "@visx/axis";
import React, { useMemo } from "react";
import { Tooltip, defaultStyles, withTooltip } from "@visx/tooltip";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";

import { BarGroup } from "@visx/shape";
import { BarGroupBar } from "@visx/shape/lib/types";
import { Group } from "@visx/group";
import { WeatherPoint } from "src/services/hooks/useWeather/types";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { useWeather } from "src/services/hooks/useWeather";

interface BarGroupProps {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  dayOfWeek: string;
}

type BarGroupPropsWithTooltip = BarGroupProps &
  WithTooltipProvidedProps<BarGroupBar<string>>;

const blue = "#00b0ff";
export const green = "#e5fd3d";
const red = "#FE3636";
export const background = "#FFFFFF";

const keys = ["maxTemp", "minTemp"];
const defaultMargin = { top: 40, right: 0, bottom: 40, left: 50 };

// accessors
const getDate = (d: WeatherPoint) => d.time;

// scales
const minMaxScale = scaleBand<string>({
  domain: keys,
  padding: 0.1,
});

const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [red, blue],
});

let tooltipTimeout: number;

const WeatherGraph = ({
  width,
  height,
  events = false,
  margin = defaultMargin,
  dayOfWeek,
  tooltipOpen,
  tooltipLeft,
  tooltipTop,
  tooltipData,
  hideTooltip,
  showTooltip,
}: BarGroupPropsWithTooltip) => {
  const { daysSummary = [] } = useWeather({});
  const tempPointsOfTheDay = useMemo(() => {
    return daysSummary.find((day) => day.title === dayOfWeek)?.data ?? [];
  }, [dayOfWeek, daysSummary]);

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const dateScale = scaleBand<string>({
    domain: tempPointsOfTheDay.map(getDate),
    padding: 0.2,
  });
  const tempScale = scaleLinear<number>({
    domain: [0, Math.max(...tempPointsOfTheDay.map((d) => d.maxTemp))],
  });

  // update scale output dimensions
  dateScale.rangeRound([0, xMax]);
  minMaxScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.range([yMax, 0]);

  return (
    <div>
      <svg width={"100%"} height={height}>
        <rect
          x={0}
          y={0}
          width={"100%"}
          height={height}
          fill={background}
          rx={5}
        />
        <Group top={margin.top} left={margin.left}>
          <BarGroup
            data={tempPointsOfTheDay}
            keys={keys}
            height={yMax}
            x0={getDate}
            x0Scale={dateScale}
            x1Scale={minMaxScale}
            yScale={tempScale}
            color={colorScale}
          >
            {(barGroups) =>
              barGroups.map((barGroup,indexBarGroup) => (
                <Group
                  key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                  left={barGroup.x0}
                >
                  {barGroup.bars.map((bar) => (
                    <rect
                      key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={4}
                      onClick={() => {
                        if (!events) return;
                        const { key, value } = bar;
                        alert(JSON.stringify({ key, value }));
                      }}
                      onMouseLeave={() => {
                        tooltipTimeout = window.setTimeout(() => {
                          hideTooltip();
                        }, 300);
                      }}
                      onMouseMove={() => {
                        console.log("olá", bar);
                        if (tooltipTimeout) clearTimeout(tooltipTimeout);
                        const top = bar.y + margin.top;
                        const left =
                          bar.width * (indexBarGroup * 3 + bar.index) +
                          bar.x +
                          margin.left;
                        showTooltip({
                          tooltipData: bar,
                          tooltipTop: top,
                          tooltipLeft: left,
                        });
                      }}
                    />
                  ))}
                </Group>
              ))
            }
          </BarGroup>
          <AxisLeft
            hideAxisLine
            scale={tempScale}
            stroke={"#000000"}
            tickStroke={"#000000"}
            tickLabelProps={() => ({
              fill: "#000000",
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em",
            })}
          />
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          left={margin.left}
          scale={dateScale}
          stroke={"#000000"}
          tickStroke={"#000000"}
          hideAxisLine
          tickLabelProps={() => ({
            fill: "#000000",
            fontSize: 12,
            textAnchor: "middle",
          })}
        />
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={defaultStyles}>
          <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>{tooltipData.value}</strong>
          </div>
        </Tooltip>
      )}
    </div>
  );
};
export default withTooltip<BarGroupProps, BarGroupBar<string>>(WeatherGraph);
