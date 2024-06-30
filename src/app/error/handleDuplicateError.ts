import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateId = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedEmail = match ? match[1] : "";

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `E11000 duplicate key error index: email_1 dup key: { email: "${extractedEmail}" }`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: `E11000 duplicate key error collection:: email_1 dup key: { email: "${extractedEmail}" }`,
    errorSources,
  };
};

export default handleDuplicateId;
