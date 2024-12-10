import SettingsContainer from "@/components/settings/settings.container";

type SettingsPageProps = {
  params: Promise<{ plantId: string }>;
};

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const { plantId } = await params;

  return <SettingsContainer plantId={Number(plantId)} />;
};

export default SettingsPage;
