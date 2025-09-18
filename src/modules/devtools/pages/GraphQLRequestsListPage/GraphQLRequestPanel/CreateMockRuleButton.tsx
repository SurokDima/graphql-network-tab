import { FC, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/joy";

import { GraphQLRequest } from "../../../../common/types/graphQLRequest";
import { CreateRuleModal } from "../../../features/RuleCreationModal/CreateRuleCreationModal";

export type CreateRuleButtonProps = {
  selectedRequest: GraphQLRequest | null;
};

export const CreateRuleButton: FC<CreateRuleButtonProps> = ({ selectedRequest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IconButton size="sm" onClick={() => setIsModalOpen(true)} variant="plain">
        <EditIcon />
      </IconButton>
      {isModalOpen && (
        <CreateRuleModal
          isOpen={isModalOpen}
          selectedRequest={selectedRequest}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
