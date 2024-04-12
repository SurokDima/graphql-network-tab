import { FC, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/joy";

import { GraphQLRequest } from "../../../../common/types/graphQL-request";
import { GraphQLRequestRuleCreationModal } from "../../../features/GraphQLRequestRuleCreationModal/GraphQLRequestRuleCreationModal";

export type CreateMockRuleButtonProps = {
  selectedRequest: GraphQLRequest | null;
};

export const CreateMockRuleButton: FC<CreateMockRuleButtonProps> = ({ selectedRequest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IconButton size="sm" onClick={() => setIsModalOpen(true)} variant="plain">
        <EditIcon />
      </IconButton>
      {isModalOpen && (
        <GraphQLRequestRuleCreationModal
          isOpen={isModalOpen}
          selectedRequest={selectedRequest}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
