declare class RequestError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number, cause: Error | undefined, parentCallStack: string | undefined);
}
export default RequestError;
