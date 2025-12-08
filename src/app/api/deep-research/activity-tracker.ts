/* eslint-disable @typescript-eslint/no-explicit-any */
import { Activity, ResearchState } from './types';


export const createActivityTracker = (dataStream: any, researchState: ResearchState) => {

    return {
        add: (type: Activity['type'], status: Activity['status'], message: Activity['message']) => {
            dataStream.write({
                type: "text-delta",
                delta: `\n[${type.toUpperCase()}] ${message}\n`,
                id: "activity"
            })
        }
    }
}

