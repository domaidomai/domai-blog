export interface HomeProfileStat {
  label: string;
  value: string;
}

interface HomeProfileStatsInput {
  postCount: number;
  projectCount: number;
}

const countFormatter = new Intl.NumberFormat("zh-CN");

export const buildHomeProfileStats = ({
  postCount,
  projectCount,
}: HomeProfileStatsInput): HomeProfileStat[] => [
  {
    label: "文章数",
    value: countFormatter.format(postCount),
  },
  {
    label: "项目数",
    value: countFormatter.format(projectCount),
  },
];
