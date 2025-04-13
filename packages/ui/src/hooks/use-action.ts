import { useVariables } from "../components/variables-context";

export type BaseActionConfig = {
  slug: string;
  label?: string;
};

export type NavigationActionConfig = BaseActionConfig & {
  type: "navigation";
  to: string;
};

export type ModalActionConfig = BaseActionConfig & {
  type: "modal";
  widget: string;
};

export type ActionConfig = NavigationActionConfig | ModalActionConfig;

export const useAction = () => {
  const { resolveTemplate } = useVariables();

  const execute = async (action: ActionConfig, data?: any) => {
    switch (action.type) {
      case "navigation":
        const url = resolveTemplate(action.to, {
          ...data,
        });

        console.log("url", url);
        // router.push(url);
        return null;
      case "modal":
        // openWidget(action.widget);
        return null;
      default:
        return null;
    }
  };

  return { execute };
};
