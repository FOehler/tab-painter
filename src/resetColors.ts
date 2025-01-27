import * as vscode from "vscode";

const COLOR_CUSTOMIZATIONS_SETTING = "colorCustomizations";

export default async () => { 
   const settings = vscode.workspace.getConfiguration("workbench");
   settings.update(
       COLOR_CUSTOMIZATIONS_SETTING,
       undefined,
       vscode.ConfigurationTarget.Global // Workspace does not work for colorCustomizations with azure data studio 
     );
};
