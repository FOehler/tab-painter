# Retirement of Azure Data Studio

Azure Data Studio will be retired in February 2026. Therefore, **this extension will not be developed further**. Similar functionality for Visual Studio Code exists in extensions like: [ColorTabs](https://github.com/oreporan/color-tabs-vscode/tree/master). 

# TabPainter for Azure Data Studio

Accidentally running a query on the wrong database server can have serious consequences. This extension provides an immediate visual indicator of which server you're connected to by coloring your editor interface. Never accidentally run a query on the wrong server again!

## Features
- Automatically colors editor components based on the active database connection
- Customizable color schemes for different server names with full regex support
- Visual safeguard to easily distinguish between production and development environments
- Helps prevent running queries on unintended servers

## Extension Settings

### Color Mapping Configuration

The main configuration is done through `tabPainter.mapping`, which defines the color rules:

```json
{
  "tabPainter.mapping": [
    {
      "regex": "production.*", 
      "color": "#FF0000"
    },
    {
      "regex": "localhost",
      "color": "#00FF00"
    }
  ]
}
```
The "regex" entry supports all Javascript regex expressions and matches on the server connected in the active tab. 

### Other Settings

| Setting | Description | Default | Type |
|---------|-------------|---------|------|
| `colorTabs.ignoreCase` | Ignore case when matching regex patterns | `true` | boolean |
| `colorTabs.statusBarBackground` | Color the status bar background | `true` | boolean |
| `colorTabs.tabBorder` | Color the tab borders | `true` | boolean |
| `colorTabs.titleBackground` | Color the title background | `false` | boolean |
| `colorTabs.activityBarBackground` | Color the activity bar background | `false` | boolean |
| `colorTabs.titleLabel` | Show colored title label | `false` | boolean |
| `colorTabs.tabBackground` | Color the tab background | `false` | boolean |

## Changelog
- [0.1.0]
  - Initial release

## Credits
I took inspiration from the Visual Studio Code extension [ColorTabs](https://github.com/oreporan/color-tabs-vscode/tree/master) by [Ore Poran](https://github.com/oreporan).
