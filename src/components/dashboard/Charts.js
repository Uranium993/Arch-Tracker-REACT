import React from "react";
import { Line } from "@ant-design/charts";
import { useQueryClient } from "react-query";

const Page = () => {
  const queryClient = useQueryClient();

  const queryData = queryClient.getQueryData("projects");

  let data = [
    // { year: "2021", value: 30, category: "liquid" },
    // { year: "2022", value: 4, category: "solid" },
    // { year: "1993", value: 3.5, category: "liquid" },
    // { year: "1994", value: 5, category: "solid" },
    // { year: "1995", value: 4.9 },
    // { year: "1996", value: 6 },
    // { year: "1997", value: 7 },
    // { year: "1998", value: 9 },
    // { year: "1999", value: 13 },
  ].reverse();

  queryData?.map(({ date, estimatedWorth, finalWorth }) => {
    const newDate = date;
    data.unshift({ date: newDate, value: finalWorth, category: "Final Worth" });
    data.unshift({
      date: newDate,
      value: estimatedWorth,
      category: "Estimated Worth",
    });

    return null;
  });

  const config = {
    data,
    height: 400,
    xField: "date",
    yField: "value",
    seriesField: "category",
    xAxis: {
      type: "time",
    },
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    point: {
      size: 7,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };
  return <Line {...config} />;
};
export default Page;
