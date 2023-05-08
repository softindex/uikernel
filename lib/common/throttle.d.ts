type TFunction<TArgs extends unknown[], TResult> = (...args: TArgs) => TResult;
declare function throttle<TResult = unknown, TArgs extends unknown[] = []>(func: TFunction<TArgs, Promise<TResult>>): TFunction<TArgs, Promise<TResult>>;
export default throttle;
