"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useNodesState,
  useEdgesState,
  reconnectEdge,
  addEdge,
  OnConnect,
  OnEdgeUpdateFunc,
  Edge,
  NodeDragHandler,
  NodeProps,
} from "reactflow";
import {
  useDeleteMutation,
  useInsertMutation,
  useQuery,
  useSubscriptionQuery,
  useUpdateMutation,
} from "@supabase-cache-helpers/postgrest-swr";
import toast from "react-hot-toast";
import { z } from "zod";

import { getEdges, getNodes, getSensors } from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";
import FlowPresenter from "./flow.presenter";
import CustomEdge from "./custom-edge";
import CustomNode from "./custom-node";
import { CreateNodeSchema, UpdateNodeSchema } from "@/schemas";

type FlowContainerProps = {
  plantId: number;
};

const FlowContainer = memo(({ plantId }: FlowContainerProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const edgeReconnectSuccessful = useRef(true);

  const [isOpenCreateNodeModal, setIsOpenCreateNodeModal] = useState(false);
  const [isOpenUpdateNodeModal, setIsOpenUpdateNodeModal] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const supabase = createBrowserClient();
  const savedNodes = useQuery(getNodes(supabase, "plantId", plantId));
  const savedEdes = useQuery(getEdges(supabase, "plantId", plantId));

  const sensors = useQuery(getSensors(supabase, "plantId", plantId));

  // センサーデータの監視
  useSubscriptionQuery(
    supabase,
    "data",
    {
      event: "*",
      table: "data",
      schema: "public",
      filter: "plantId=" + plantId,
    },
    ["dataId"],
    "*"
  );

  const nodeTypes = useMemo(
    () => ({
      custom: ({ ...props }: NodeProps) => (
        <CustomNode
          isReadOnly={isReadOnly}
          onEdit={() => {
            setIsOpenUpdateNodeModal(true);
            setSelectedId(Number(props.id.replace("node", "")));
          }}
          {...props}
        />
      ),
    }),
    [isReadOnly]
  );
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  const { trigger: insertNode, isMutating: isLoadingInsertNode } =
    useInsertMutation(supabase.from("node"), ["nodeId"], "*", {
      throwOnError: true,
    });

  const { trigger: updateNode, isMutating: isLoadingUpdateNode } =
    useUpdateMutation(supabase.from("node"), ["nodeId"], "*", {
      throwOnError: true,
    });

  const { trigger: insertEdge } = useInsertMutation(
    supabase.from("edge"),
    ["edgeId"],
    "*",
    { throwOnError: true }
  );

  const { trigger: updateEdge } = useUpdateMutation(
    supabase.from("edge"),
    ["edgeId"],
    "*",
    { throwOnError: true }
  );

  const { trigger: deleteEdge } = useDeleteMutation(
    supabase.from("edge"),
    ["edgeId"],
    "*",
    { throwOnError: true }
  );

  const { trigger: updateSensor } = useUpdateMutation(
    supabase.from("sensor"),
    ["sensorId"],
    "*",
    { throwOnError: true }
  );

  useEffect(() => {
    if (savedNodes.data && savedNodes.data.length > 0) {
      const initialNodes = savedNodes.data.map((node) => {
        const data = sensors.data
          ?.filter((sensor) => sensor.nodeId === node.nodeId)
          .reduce(
            (acc, sensor) => {
              if (sensor.value) {
                if (sensor.type === "temperature") {
                  acc.temperature = sensor.value;
                }

                if (sensor.type === "humidity") {
                  acc.humidity = sensor.value;
                }

                if (sensor.type === "pressure") {
                  acc.pressure = sensor.value;
                }

                if (sensor.type === "volume") {
                  acc.volume = sensor.value;
                }
              }

              return acc;
            },
            { temperature: 0, humidity: 0, pressure: 0, volume: 0 }
          );

        return {
          id: "node" + node.nodeId,
          position: { x: node.x, y: node.y },
          data: {
            name: node.name,
            value: data
              ? {
                  temperature: data.temperature,
                  humidity: data.humidity,
                  pressure: data.pressure,
                  volume: data.volume,
                }
              : { temperature: 0, humidity: 0, pressure: 0, volume: 0 },
            type: node.type,
          },
          type: "custom",
        };
      });

      setNodes(initialNodes);
    }

    if (savedEdes.data && savedEdes.data.length > 0) {
      const initialEdes = savedEdes.data.map((edge) => ({
        id: "edge" + edge.edgeId,
        source: "node" + edge.sourceId.toString(),
        target: "node" + edge.targetId.toString(),
        type: "custom",
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
      }));

      setEdges(initialEdes);
    }
  }, [savedNodes.data, savedEdes.data, sensors.data, setNodes, setEdges]);

  const onConnect: OnConnect = useCallback(
    async (params) => {
      try {
        if (
          params.source &&
          params.target &&
          params.sourceHandle &&
          params.targetHandle
        ) {
          const data = await insertEdge([
            {
              sourceId: Number(params.source.replace("node", "")),
              targetId: Number(params.target.replace("node", "")),
              sourceHandle: params.sourceHandle,
              targetHandle: params.targetHandle,
              plantId,
            },
          ]);

          if (!data || data.length === 0) {
            toast.error("保存中にエラーが発生しました");
            return;
          }

          setEdges((eds) =>
            addEdge(
              { ...params, id: "edge" + data[0].edgeId, type: "custom" },
              eds
            )
          );
        }
      } catch {
        toast.error("保存中にエラーが発生しました");
      }
    },
    [insertEdge, plantId, setEdges]
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect: OnEdgeUpdateFunc = useCallback(
    (oldEdge, newConnection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onReconnectEnd = useCallback(
    async (_event: MouseEvent | TouchEvent, edge: Edge) => {
      try {
        if (!edgeReconnectSuccessful.current) {
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
          await deleteEdge({ edgeId: Number(edge.id.replace("edge", "")) });
        } else if (edge.sourceHandle && edge.targetHandle) {
          await updateEdge({
            edgeId: Number(edge.id.replace("edge", "")),
            sourceId: Number(edge.source),
            targetId: Number(edge.target),
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
          });
        }
      } catch {
        toast.error("保存中にエラーが発生しました");
      }
      edgeReconnectSuccessful.current = true;
    },
    [setEdges, deleteEdge, updateEdge]
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    async (_event, node) => {
      try {
        await updateNode({
          nodeId: Number(node.id.replace("node", "")),
          x: node.position.x,
          y: node.position.y,
        });
      } catch {
        toast.error("保存中にエラーが発生しました");
      }
    },
    [updateNode]
  );

  const getViewport = useCallback(() => {
    if (reactFlowWrapper.current) {
      const rect = reactFlowWrapper.current.getBoundingClientRect();

      return {
        width: rect.width,
        height: rect.height,
      };
    }

    return { width: 0, height: 0 };
  }, []);

  const createNodeHandler = useCallback(
    async (values: z.infer<typeof CreateNodeSchema>) => {
      const viewport = getViewport();
      const center = {
        x: viewport.width / 2,
        y: viewport.height / 2,
      };

      const node = await insertNode([
        {
          name: values.name,
          plantId,
          type: values.type,
          x: center.x,
          y: center.y,
        },
      ]);

      if (node && node.length > 0) {
        await Promise.all(
          values.type.map(async (type) => {
            if (values.sensorId[type]) {
              return await updateSensor({
                sensorId: Number(values.sensorId[type]),
                nodeId: node[0].nodeId,
                type,
                plantId,
              });
            }
          })
        );
      }
    },
    [getViewport, insertNode, plantId, updateSensor]
  );

  const updateNodeHandler = useCallback(
    async (values: z.infer<typeof UpdateNodeSchema>) => {
      if (selectedId) {
        const node = await updateNode({
          nodeId: selectedId,
          name: values.name,
          type: values.type,
        });

        if (node) {
          await Promise.all(
            values.type.map(async (type) => {
              if (values.sensorId[type]) {
                return await updateSensor({
                  sensorId: Number(values.sensorId[type]),
                  nodeId: node.nodeId,
                  type,
                  plantId,
                });
              }
            })
          );
        }
      }
    },
    [plantId, selectedId, updateNode, updateSensor]
  );

  return (
    <FlowPresenter
      reactFlowWrapper={reactFlowWrapper}
      isOpenCreateNodeModal={isOpenCreateNodeModal}
      setIsOpenCreateNodeModal={setIsOpenCreateNodeModal}
      isOpenUpdateNodeModal={isOpenUpdateNodeModal}
      setIsOpenUpdateNodeModal={setIsOpenUpdateNodeModal}
      isReadOnly={isReadOnly}
      setIsReadOnly={setIsReadOnly}
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
      createNodeHandler={createNodeHandler}
      isLoadingCreateNode={isLoadingInsertNode}
      updateNodeHandler={updateNodeHandler}
      isLoadingUpdateNode={isLoadingUpdateNode}
    />
  );
});

export default FlowContainer;
