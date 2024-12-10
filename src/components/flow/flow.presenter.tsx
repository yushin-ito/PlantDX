import { Dispatch, memo, RefObject, SetStateAction } from "react";
import {
  ReactFlow,
  Edge,
  Node,
  OnConnect,
  NodeDragHandler,
  OnEdgeUpdateFunc,
  NodeChange,
  EdgeChange,
  EdgeTypes,
  NodeTypes,
} from "reactflow";
import { Plus } from "lucide-react";
import { z } from "zod";

import { Button } from "../ui/button";
import CustomConnectionLine from "./custom-connection-line";
import CustomControls from "./custom-controls";
import { CreateNodeSchema } from "@/schemas";
import CreateNodeModal from "./create-node.modal";

import "reactflow/dist/style.css";

type FlowPresenterProps = {
  reactFlowWrapper: RefObject<HTMLDivElement>;
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  readOnly: boolean;
  setReadOnly: Dispatch<SetStateAction<boolean>>;
  nodes: Node[];
  edges: Edge[];
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: OnConnect;
  onReconnectStart: () => void;
  onReconnect: OnEdgeUpdateFunc;
  onReconnectEnd: (event: MouseEvent | TouchEvent, edge: Edge) => void;
  onNodeDragStop: NodeDragHandler;
  createNodeHandler: (values: z.infer<typeof CreateNodeSchema>) => Promise<void>;
  isLoadingCreateNode: boolean;
};

const FlowPresenter = memo(
  ({
    reactFlowWrapper,
    isOpenModal,
    setIsOpenModal,
    readOnly,
    setReadOnly,
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    onNodeDragStop,
    createNodeHandler,
    isLoadingCreateNode,
  }: FlowPresenterProps) => (
    <div ref={reactFlowWrapper} className="size-full">
      <ReactFlow
        fitView
        nodesConnectable={!readOnly}
        nodeOrigin={[0.5, 0.5]}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        onNodeDragStop={onNodeDragStop}
        connectionLineComponent={CustomConnectionLine}
      >
        <CustomControls readOnly={readOnly} setReadOnly={setReadOnly} />
      </ReactFlow>
      <Button
        variant="brand"
        className="absolute bottom-8 right-8 z-fab size-12 rounded-full shadow-md"
        onClick={() => setIsOpenModal(true)}
      >
        <Plus className="size-6" />
      </Button>
      <CreateNodeModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        createNodeHandler={createNodeHandler}
        isLoadingCreateNode={isLoadingCreateNode}
      />
    </div>
  )
);

export default FlowPresenter;
