import { Dispatch, ReactNode } from "react";
import { Tenant } from "../../types/Tenant"

export type DataType = {
    tenant: Tenant | null;
}

export type ActionType = {
    type: Actions;
    payload?: any;
}

export type ContextType = {
    state: DataType;
    dispatch: Dispatch<{type: Actions, payload?: any}>;
}

export type ProviderType = {
    children: ReactNode
}

export enum Actions {
    SET_TENANT
}

// https://kaloraat.com/articles/nextjs-react-context-tutorial-how-to-use-context-api-with-nextjs
// https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/