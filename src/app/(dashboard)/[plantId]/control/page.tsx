import ControlContainer from "@/components/control/control.container";

type ControlPageProps = {
  params: Promise<{ plantId: string }>;
};

const ControlPage = async ({ params }: ControlPageProps) => {
  const { plantId } = await params;

  return <ControlContainer plantId={Number(plantId)} />;
};

export default ControlPage;
