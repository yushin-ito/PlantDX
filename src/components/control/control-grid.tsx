"use client";

import {
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  DragStartEvent,
  DragEndEvent,
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import ControlButton from "./control-button";
import { Control, ControlEvent, ControlStatus } from "@/types";

type ControlGridProps = {
  controls: Control["Row"][];
  isDraggable: boolean;
  onClickControlButton: () => void;
  onOpenUpdateControlSheet: (controlId: number) => void;
};

const ControlGrid = memo(
  ({
    controls,
    isDraggable,
    onClickControlButton,
    onOpenUpdateControlSheet,
  }: ControlGridProps) => {
    const renderRef = useRef(true);
    const [items, setItems] = useState<string[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const active = controls.find(
      (control) => control.controlId.toString() === activeId
    );

    useEffect(() => {
      if (renderRef.current) {
        setItems(controls.map((control) => control.controlId.toString()));
        renderRef.current = false;
      }
    }, [controls]);

    const handleDragStart = useCallback((event: DragStartEvent) => {
      setActiveId(event.active.id.toString());
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setItems((items) => {
          const from = items.indexOf(active.id.toString());
          const to = items.indexOf(over.id.toString());
          return arrayMove(items, from, to);
        });
      }

      setActiveId(null);
    }, []);

    const handleDragCancel = useCallback(() => {
      setActiveId(null);
    }, []);

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="grid w-full grid-cols-[repeat(auto-fit,150px)] justify-center gap-6 pb-4 sm:grid-cols-[repeat(auto-fit,160px)] sm:pb-0">
            {items.map((id, index) => {
              const control = controls.find(
                (control) => control.controlId.toString() === id
              );
              return (
                control && (
                  <ControlButton
                    key={index}
                    isDraggable={isDraggable}
                    controlId={control.controlId}
                    name={control.name}
                    status={control.status as ControlStatus}
                    event={control.event as ControlEvent}
                    onClick={onClickControlButton}
                    onOpen={() => onOpenUpdateControlSheet(control.controlId)}
                  />
                )
              );
            })}
          </div>
        </SortableContext>
        <DragOverlay adjustScale>
          {active && (
            <ControlButton
              className="scale-105 !cursor-grabbing shadow-xl"
              controlId={active.controlId}
              name={active.name}
              status={active.status as ControlStatus}
              event={active.event as ControlEvent}
              onClick={() => {}}
              onOpen={() => {}}
            />
          )}
        </DragOverlay>
      </DndContext>
    );
  }
);

export default ControlGrid;
