declare class ArgumentsError extends Error {
    status: number;
    statusCode: number;
    stack: string;
    constructor(message: string);
}
export default ArgumentsError;
