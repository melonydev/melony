import { CallbackConfig } from "@/lib/types/actions";
import { Button } from "./ui/button";
import { useMelony } from "./melony-provider";
import { useModal } from "./modal-provider";

export const PrimaryButton = ({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: (config: CallbackConfig) => void;
  className?: string;
}) => {
  const { navigate } = useMelony();
  const modal = useModal();

  return (
    <Button
      className={className}
      onClick={() => onClick({ navigate, ...modal })}
    >
      {label}
    </Button>
  );
};
