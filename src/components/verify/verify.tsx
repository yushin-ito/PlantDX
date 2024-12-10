import { Card, CardContent } from "../ui/card";
import { Center } from "../ui/center";
import { VStack } from "../ui/vstack";

const Verify = () => {
  return (
    <Center className="size-full">
      <Card>
        <CardContent className="w-[400px] py-6">
          <VStack className="w-full space-y-6">
            <div className="text-center text-xl font-bold">新規登録</div>
          </VStack>
        </CardContent>
      </Card>
    </Center>
  );
};

export default Verify;
