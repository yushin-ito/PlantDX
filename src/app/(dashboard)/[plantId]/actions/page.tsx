import ActionsContainer from "@/components/actions/actions.container";

type ActionsPageProps = {
  params: Promise<{ plantId: string }>;
};

const ActionsPage = async ({ params }: ActionsPageProps) => {
  const { plantId } = await params;

  return <ActionsContainer plantId={Number(plantId)} />;
};

export default ActionsPage;
