import HistoryContainer from "@/components/history/history.container";

type HistoryPageProps = {
  params: Promise<{ plantId: string }>;
};

const HistoryPage = async ({ params }: HistoryPageProps) => {
  const { plantId } = await params;

  return <HistoryContainer plantId={Number(plantId)} />;
};

export default HistoryPage;
