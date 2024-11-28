import { ChevronDown } from "lucide-react";

import Center from "../atoms/Center";
import HStack from "../atoms/HStack";
import VStack from "../atoms/VStack";
import Analysis from "../organisms/Analysis";
import Chart from "../organisms/Chart";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Graph = () => {
  return (
    <Center className="size-full">
      <VStack className="w-[90%] space-y-12 rounded-xl bg-white px-10 py-8 shadow-md">
        <HStack className="justify-between">
          <VStack className="space-y-1">
            <h2 className="text-xl font-bold">MACHタンク</h2>
            <p className="text-xs text-gray-500">2024/01/01 00:00</p>
          </VStack>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-lg border border-gray-300 shadow-none">
                MACHタンク <ChevronDown className="text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem>MACHタンク</DropdownMenuItem>
              <DropdownMenuItem>ヒーター1</DropdownMenuItem>
              <DropdownMenuItem>廃油タンク</DropdownMenuItem>
              <DropdownMenuItem>恒温槽</DropdownMenuItem>
              <DropdownMenuItem>分離塔</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </HStack>
        <Chart />
        <Analysis />
      </VStack>
    </Center>
  );
};

export default Graph;
