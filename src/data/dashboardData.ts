import { ReactNode } from "react";

export interface DashboardData {
  hourlyData: any;
  subTitle: ReactNode;
  subValue: ReactNode;
  id: string;
  value: string | number;
  title: string;
  metrics: {
    label: string;
    value: string | number;
    highlight?: boolean;
  }[];
  timestamp?: string;
  status?: "active" | "inactive";
}

export const dashboardData: DashboardData[] = [
  {
    id: "1",
    value: "1%",
    title: "PERFORMANCE EFI",
    metrics: [
      { label: "LINE EFI", value: "-" },
      { label: "HOURLY TARGET/ACHIEVE", value: "-" },
      { label: "TODAY TARGET/ACHIEVE", value: "-" }
    ],
    timestamp: "15:45",
    status: "active",
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "2",
    value: "0.32%",
    title: "LINE EFI",
    metrics: [
      { label: "TOPAY CHECK QTY", value: "-" },
      { label: "DHU", value: "-" },
      { label: "TOP 3 DEFECTS", value: "-", highlight: true }
    ],
    timestamp: "15:45",
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "3",
    value: "56 / 0",
    title: "HOURLY TARGET/ACHIEVE",
    metrics: [
      { label: "TOTAL DEFECT QTY", value: "-" },
      { label: "DHU", value: "-" }
    ],
    status: "active",
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "4",
    value: "1009.8 / 0",
    title: "TODAY TARGET/ACHIEVE",
    metrics: [
      { label: "HOURLY TARGET/ACHIEVE", value: "-", highlight: true },
      { label: "TODAY TARGET/ACHIEVE", value: "-", highlight: true }
    ],
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "5",
    value: "406 / 0",
    title: "UPTO NOW TARGET/ARCHIVE",
    metrics: [
      { label: "HOURLY TARGET/ACHIEVE", value: "-", highlight: true },
      { label: "TODAY TARGET/ACHIEVE", value: "-", highlight: true }
    ],
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "6",
    value: "0",
    title: "TOTAL CHECK QTY",
    metrics: [
      { label: "HOURLY TARGET/ACHIEVE", value: "-", highlight: true },
      { label: "TODAY TARGET/ACHIEVE", value: "-", highlight: true }
    ],
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "7",
    value: "56",
    title: "HOURLY BALANCE",
    metrics: [
      { label: "HOURLY TARGET/ACHIEVE", value: "-", highlight: true },
      { label: "TODAY TARGET/ACHIEVE", value: "-", highlight: true }
    ],
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "8",
    value: "1009.8",
    title: "TODAY BALANCE",
    metrics: [
      { label: "HOURLY TARGET/ACHIEVE", value: "-", highlight: true },
      { label: "TODAY TARGET/ACHIEVE", value: "-", highlight: true }
    ],
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  // Additional boxes to reach 12
  {
    id: "9",
    value: "407",
    title: "UPTO NOW BALANCE",
    metrics: [
      { label: "HOURLY TARGET/ACHIEVE", value: "-", highlight: true },
      { label: "TODAY TARGET/ACHIEVE", value: "-", highlight: true }
    ],
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "10",
    value: "395 / 0",
    title: "TOTAL DEFECT QTY",
    metrics: [
      { label: "HOURLY TARGET/ACHIEVE", value: "-", highlight: true },
      { label: "TODAY TARGET/ACHIEVE", value: "-", highlight: true }
    ],
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "11",
    value: "0.0%",
    title: "DHU",
    metrics: [
      { label: "HOURLY TARGET/ACHIEVE", value: "-", highlight: true },
      { label: "TODAY TARGET/ACHIEVE", value: "-", highlight: true }
    ],
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  },
  {
    id: "12",
    value: "1.123",
           
    title: "TOP 3 DEFECTS",
    metrics: [
      { label: "HOURLY TARGET/ACHIEVE", value: "-", highlight: true },
      { label: "TODAY TARGET/ACHIEVE", value: "-", highlight: true }
    ],
    subTitle: undefined,
    subValue: undefined,
    hourlyData: undefined
  }
];