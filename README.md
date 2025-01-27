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
      "regex": "production.*", // full regex support
      "color": "#FF0000"  // Red for production
    },
    {
      "regex": "localhost",
      "color": "#00FF00"  // Green for localhost
    }
  ]
}
```

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