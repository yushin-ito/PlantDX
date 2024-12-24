import { Clock, GitCommitHorizontal } from "lucide-react";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { memo } from "react";

type CustomTooltipProps = {
  name: string;
  value: number;
  unit: string;
  date: string;
};

const CustomTooltip = memo(
  ({ name, value, unit, date }: CustomTooltipProps) => (
    <VStack className="w-full space-y-2">
      <HStack className="w-full items-center space-x-1">
        <GitCommitHorizontal
          className="size-4 text-brand-600"
          strokeWidth={3}
        />
        <HStack className="w-full items-center justify-between">
          <p className="text-xs">{name}</p>
          <div>
            {Number(value).toFixed(2)}
            <span>{unit}</span>
          </div>
        </HStack>
      </HStack>
      <HStack className="w-full items-center space-x-1">
        <Clock className="size-4 text-brand-600" strokeWidth={3} />
        <HStack className="w-full items-center justify-between">
          <p className="text-xs">時間</p>
          <div>{date}</div>
        </HStack>
      </HStack>
    </VStack>
  )
);

export default CustomTooltip;
