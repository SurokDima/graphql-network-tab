# Injected Script Module

> **Note:** This module is inseparable part of the application, not a separate module.

The script inside this module is meant to be run inside a page environment.
This script is injected by service worker into a page, therefore it does not have restrictions like other content scripts have.
For example the script can substitute global variables and it'll be visible for native scripts of the page.
