/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MatchResults } from "@stencil-community/router";
export namespace Components {
    interface AppChecklist {
    }
    interface AppHome {
    }
    interface AppModal {
    }
    interface AppProfile {
        "match": MatchResults;
    }
    interface AppRoot {
    }
    interface AppSavedChecklists {
    }
}
declare global {
    interface HTMLAppChecklistElement extends Components.AppChecklist, HTMLStencilElement {
    }
    var HTMLAppChecklistElement: {
        prototype: HTMLAppChecklistElement;
        new (): HTMLAppChecklistElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppModalElement extends Components.AppModal, HTMLStencilElement {
    }
    var HTMLAppModalElement: {
        prototype: HTMLAppModalElement;
        new (): HTMLAppModalElement;
    };
    interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {
    }
    var HTMLAppProfileElement: {
        prototype: HTMLAppProfileElement;
        new (): HTMLAppProfileElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLAppSavedChecklistsElement extends Components.AppSavedChecklists, HTMLStencilElement {
    }
    var HTMLAppSavedChecklistsElement: {
        prototype: HTMLAppSavedChecklistsElement;
        new (): HTMLAppSavedChecklistsElement;
    };
    interface HTMLElementTagNameMap {
        "app-checklist": HTMLAppChecklistElement;
        "app-home": HTMLAppHomeElement;
        "app-modal": HTMLAppModalElement;
        "app-profile": HTMLAppProfileElement;
        "app-root": HTMLAppRootElement;
        "app-saved-checklists": HTMLAppSavedChecklistsElement;
    }
}
declare namespace LocalJSX {
    interface AppChecklist {
    }
    interface AppHome {
    }
    interface AppModal {
    }
    interface AppProfile {
        "match"?: MatchResults;
    }
    interface AppRoot {
    }
    interface AppSavedChecklists {
    }
    interface IntrinsicElements {
        "app-checklist": AppChecklist;
        "app-home": AppHome;
        "app-modal": AppModal;
        "app-profile": AppProfile;
        "app-root": AppRoot;
        "app-saved-checklists": AppSavedChecklists;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-checklist": LocalJSX.AppChecklist & JSXBase.HTMLAttributes<HTMLAppChecklistElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-modal": LocalJSX.AppModal & JSXBase.HTMLAttributes<HTMLAppModalElement>;
            "app-profile": LocalJSX.AppProfile & JSXBase.HTMLAttributes<HTMLAppProfileElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "app-saved-checklists": LocalJSX.AppSavedChecklists & JSXBase.HTMLAttributes<HTMLAppSavedChecklistsElement>;
        }
    }
}
