import { Children, FC, ReactNode } from "react";

import { Modal, ModalDialog } from "@mui/joy";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { interleave } from "../../../../common/utils/array.utils";

export type SplitScreenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export const SplitScreenModal: FC<SplitScreenModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog layout="fullscreen" sx={{ pb: 0, px: 0, pt: 0 }}>
        <PanelGroup direction="horizontal">
          {interleave(Children.toArray(children), <PanelResizeHandle />)}
        </PanelGroup>
      </ModalDialog>
    </Modal>
  );
};

export type SplitScreenProps = {
  children?: ReactNode;
};

export const SplitScreen: FC<SplitScreenProps> = ({ children }) => {
  return <Panel>{children}</Panel>;
};
