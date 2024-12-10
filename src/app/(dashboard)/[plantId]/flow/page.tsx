import FlowContainer from "@/components/flow/flow.container";

type FlowPageProps = {
  params: Promise<{ plantId: string }>;
};

const FlowPage = async ({ params }: FlowPageProps) => {
  const { plantId } = await params;

  return <FlowContainer plantId={Number(plantId)} />;
};

export default FlowPage;
