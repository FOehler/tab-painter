import * as vscode from "vscode";
import getSettings from "./getSettings";

type ColorCustomization = { [key: string]: string | undefined } | undefined;

const COLOR_CUSTOMIZATIONS_SETTING = "colorCustomizations";

const invertHexColor = (hex?: string) => {
  if (!hex) {
    return;
  }

  return Number(hex.replace("#", "0x")) > 0xffffff / 2 ? "#000000" : "#ffffff";
};

export default async (hexColor?: string) => {
  const hexColorInverted = invertHexColor(hexColor);
  const settings = vscode.workspace.getConfiguration("workbench");

  const currentColorCustomization: ColorCustomization =
    settings.get(COLOR_CUSTOMIZATIONS_SETTING) || {};

  const {
    tabBorder,
    tabBackground,
    titleBackground,
    activityBarBackground,
    statusBarBackground,
  } = getSettings();

  const tabBarBorderColor = hexColor;
  const titleBarBackgroundColor = hexColor;
  const titleBarForegroundColor = hexColorInverted;
  const activityBarBackgroundColor = hexColor;
  const activityBarForegroundColor = hexColorInverted;
  const statusBarBackgroundColor = hexColor;
  const statusBarForegroundColor = hexColorInverted;

  const colorCustomization: ColorCustomization = {
    ...currentColorCustomization,
    ...(tabBorder ? { "tab.activeBorder": tabBarBorderColor } : {}),
    ...(tabBackground ? { "tab.activeBackground": tabBarBorderColor } : {}),
    ...(titleBackground
      ? { "titleBar.activeBackground": titleBarBackgroundColor }
      : {}),
    ...(titleBackground
      ? { "titleBar.activeForeground": titleBarForegroundColor }
      : {}),
    ...(activityBarBackground
      ? { "activityBar.background": activityBarBackgroundColor }
      : {}),
    ...(activityBarBackground
      ? { "activityBar.foreground": activityBarForegroundColor }
      : {}),
    ...(statusBarBackground
      ? { "statusBar.background": statusBarBackgroundColor }
      : {}),
    ...(statusBarBackground
      ? { "statusBar.foreground": statusBarForegroundColor }
      : {})
  };

  const hasItems = Object.keys(colorCustomization).filter(
    (x) => !!colorCustomization[x]
  ).length;
  
  settings.update(
    COLOR_CUSTOMIZATIONS_SETTING,
    hasItems ? colorCustomization : undefined,
    vscode.ConfigurationTarget.Global // Workspace does not work for colorCustomizations with azure data studio 
  );
};