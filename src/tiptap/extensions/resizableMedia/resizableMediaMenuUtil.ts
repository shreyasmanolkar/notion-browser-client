interface ResizableMediaAction {
  tooltip: string;
  icon?: string;
  action?: (updateAttributes: (o: Record<string, any>) => any) => void;
  isActive?: (attrs: Record<string, any>) => boolean;
  delete?: (d: () => void) => void;
}

export const resizableMediaActions: ResizableMediaAction[] = [
  {
    tooltip: "Align left",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "start",
        dataFloat: null,
      }),
    icon: "mdi-format-align-left",
    isActive: (attrs) => attrs.dataAlign === "start",
  },
  {
    tooltip: "Align center",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "center",
        dataFloat: null,
      }),
    icon: "mdi-format-align-center",
    isActive: (attrs) => attrs.dataAlign === "center",
  },
  {
    tooltip: "Align right",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "end",
        dataFloat: null,
      }),
    icon: "mdi-format-align-right",
    isActive: (attrs) => attrs.dataAlign === "end",
  },
  {
    tooltip: "Delete",
    icon: "mdi-delete",
    delete: (deleteNode) => deleteNode(),
  },
];
