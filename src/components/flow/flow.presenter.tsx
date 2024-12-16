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
import { CreateNodeSchema, UpdateNodeSchema } from "@/schemas";
import CreateNodeModal from "./create-node.modal";
import UpdateNodeModal from "./update-node.modal";

import "reactflow/dist/style.css";

type FlowPresenterProps = {
  reactFlowWrapper: RefObject<HTMLDivElement>;
  isOpenCreateNodeModal: boolean;
  setIsOpenCreateNodeModal: Dispatch<SetStateAction<boolean>>;
  isOpenUpdateNodeModal: boolean;
  setIsOpenUpdateNodeModal: Dispatch<SetStateAction<boolean>>;
  isReadOnly: boolean;
  setIsReadOnly: Dispatch<SetStateAction<boolean>>;
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
  createNodeHandler: (
    values: z.infer<typeof CreateNodeSchema>
  ) => Promise<void>;
  isLoadingCreateNode: boolean;
  updateNodeHandler: (
    values: z.infer<typeof UpdateNodeSchema>
  ) => Promise<void>;
  isLoadingUpdateNode: boolean;
};

const FlowPresenter = memo(
  ({
    reactFlowWrapper,
    isOpenCreateNodeModal,
    setIsOpenCreateNodeModal,
    isOpenUpdateNodeModal,
    setIsOpenUpdateNodeModal,
    isReadOnly,
    setIsReadOnly,
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
    updateNodeHandler,
    isLoadingUpdateNode,
  }: FlowPresenterProps) => (
    <div ref={reactFlowWrapper} className="size-full">
      <ReactFlow
        fitView
        fitViewOptions={{ padding: 1 }}
        nodesConnectable={!isReadOnly}
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
        <CustomControls
          isReadOnly={isReadOnly}
          setIsReadOnly={setIsReadOnly}
        />
      </ReactFlow>
      <Button
        variant="brand"
        className="absolute bottom-8 right-8 z-fab size-12 rounded-full shadow-md"
        onClick={() => setIsOpenCreateNodeModal(true)}
      >
        <Plus className="size-6" />
      </Button>
      <CreateNodeModal
        isOpen={isOpenCreateNodeModal}
        setIsOpen={setIsOpenCreateNodeModal}
        createNodeHandler={createNodeHandler}
        isLoadingCreateNode={isLoadingCreateNode}
      />
      <UpdateNodeModal
        isOpen={isOpenUpdateNodeModal}
        setIsOpen={setIsOpenUpdateNodeModal}
        updateNodeHandler={updateNodeHandler}
        isLoadingUpdateNode={isLoadingUpdateNode}
      />
    </div>
  )
);

export default FlowPresenter;
