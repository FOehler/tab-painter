import * as vscode from 'vscode';

export type ColorMapping = {
  regex: string;
  color?: string;
};

type AllSettings = {
  mappings?: ColorMapping[];
  tabBorder?: boolean;
  tabBackground?: boolean;
  ignoreCase?: boolean;
  titleBackground?: boolean;
  activityBarBackground?: boolean;
  statusBarBackground?: boolean;
};

export default () => vscode.workspace.getConfiguration('tabPainter') as AllSettings;