import AnalyticsContainer from "@/components/analytics/analytics.container";

type AnalyticsPageProps = {
  params: Promise<{ plantId: string }>;
  searchParams: Promise<{ id: string }>;
};

const AnalyticsPage = async ({ params, searchParams }: AnalyticsPageProps) => {
  const { plantId } = await params;
  const { id } = await searchParams;

  return <AnalyticsContainer plantId={Number(plantId)} sensorId={Number(id)} />;
};

export default AnalyticsPage;
