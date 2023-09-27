import type { StrictOmit } from 'ts-essentials';
import type { XhrUriConfig, XhrUrlConfig } from 'xhr';
export type DefaultXhrSettings = XhrUriConfig | XhrUrlConfig;
export interface DefaultXhr {
    (settings: StrictOmit<DefaultXhrSettings, 'json'> & {
        json?: false;
    }): Promise<string>;
    (settings: DefaultXhrSettings | (StrictOmit<DefaultXhrSettings, 'json'> & {
        json: true;
    })): Promise<unknown>;
}
declare const defaultXhr: DefaultXhr;
export default defaultXhr;
