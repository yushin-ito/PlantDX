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

import {
  getEdges,
  getNodes,
  getPlants,
  getSensors,
  getMeasures,
} from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";
import FlowPresenter from "./flow.presenter";
import CustomEdge from "./custom-edge";
import CustomNode from "./custom-node";
import { CreateNodeSchema } from "@/schemas";

type FlowContainerProps = {
  plantId: number;
};

const FlowContainer = memo(({ plantId }: FlowContainerProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const edgeReconnectSuccessful = useRef(true);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const supabase = createBrowserClient();
  const savedNodes = useQuery(getNodes(supabase, "plantId", plantId));
  const savedEdes = useQuery(getEdges(supabase, "plantId", plantId));

  const plant = useQuery(getPlants(supabase, "plantId", plantId).single());
  const sensors = useQuery(getSensors(supabase, "plantId", plantId));
  const measures = useQuery(
    getMeasures(supabase, "plantId", plantId).eq("count", plant.count || -1)
  );

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

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  const { trigger: insertNode, isMutating: isLoadingInsertNode } =
    useInsertMutation(supabase.from("node"), ["nodeId"], "*", {
      throwOnError: true,
    });

  const { trigger: updatePlant } = useUpdateMutation(
    supabase.from("plant"),
    ["plantId"],
    "*",
    { throwOnError: true }
  );

  const { trigger: updateNode } = useUpdateMutation(
    supabase.from("node"),
    ["nodeId"],
    "*",
    { throwOnError: true }
  );

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

  const { trigger: insertAction } = useInsertMutation(
    supabase.from("action"),
    ["actionId"],
    "*",
    { throwOnError: true }
  );

  const { trigger: insertSensor } = useInsertMutation(
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
              const measure = measures.data?.find(
                (measure) => measure.sensorId === sensor.sensorId
              );

              if (measure) {
                if (sensor.type === "temperature") {
                  acc.temperature = measure.value;
                }

                if (sensor.type === "humidity") {
                  acc.humidity = measure.value;
                }

                if (sensor.type === "pressure") {
                  acc.pressure = measure.value;
                }

                if (sensor.type === "volume") {
                  acc.volume = measure.value;
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
            value: {
              temperature: data?.temperature || 0,
              humidity: data?.humidity || 0,
              pressure: data?.pressure || 0,
              volume: data?.volume || 0,
            },
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
  }, [
    savedNodes.data,
    savedEdes.data,
    sensors.data,
    measures.data,
    setNodes,
    setEdges,
  ]);

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

      if (!node || node.length === 0) {
        return;
      }

      await Promise.all(
        values.type.map(async (type) => {
          if (values.command[type]) {
            return await insertSensor([
              {
                command: values.command[type],
                nodeId: node[0].nodeId,
                type,
                plantId,
              },
            ]);
          }
        })
      );
    },
    [getViewport, insertNode, insertSensor, plantId]
  );

  const createActionHandler = useCallback(async () => {
    if (savedNodes.data && savedNodes.data.length > 0) {
      await Promise.all(
        savedNodes.data.map(async () => {
          if (sensors.data && sensors.data.length > 0) {
            sensors.data.map(async (sensor) => {
              if (plant.data) {
                await insertAction([
                  {
                    command: sensor.command,
                    sensorId: sensor.sensorId,
                    plantId,
                    deviceId: plant.data.deviceId,
                    count: plant.data.count + 1,
                  },
                ]);
              }
            });
          }
        })
      );
    }

    if (plant.data) {
      await updatePlant({
        plantId,
        count: plant.data.count + 1,
      });
    }
  }, [
    insertAction,
    plant.data,
    plantId,
    savedNodes.data,
    sensors.data,
    updatePlant,
  ]);

  return (
    <FlowPresenter
      reactFlowWrapper={reactFlowWrapper}
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      isReadOnly={isReadOnly}
      setIsReadOnly={setIsReadOnly}
      isListening={isListening}
      setIsListening={setIsListening}
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
      createActionHandler={createActionHandler}
    />
  );
});

export default FlowContainer;
