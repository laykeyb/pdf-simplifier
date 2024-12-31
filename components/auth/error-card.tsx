import { CardWrapper } from "@/components/auth/card-wrapper";

import { BsExclamationTriangle } from "react-icons/bs";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full items-center flex justify-center">
          <BsExclamationTriangle className="text-destructive"/>
      </div>
    </CardWrapper>
  );
};
