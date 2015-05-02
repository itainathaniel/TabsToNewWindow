function performCommand(event)
{
	if (event.command === "OpenNewWindow") {
		var newTabs = [];

		event.target.browserWindow.activeTab.flag = true;
		for (var i = event.target.browserWindow.tabs.length - 1; i >= 0; i--) {
			tab = event.target.browserWindow.tabs[i];
			tab.saveForLater = true;
			if (tab.flag) {
				break;
			}
		}

		for (var i = event.target.browserWindow.tabs.length - 1; i >= 0; i--) {
			tab = event.target.browserWindow.tabs[i];

			if (tab.saveForLater) {
				newTabs.push(tab.url);
				tab.close();
			}
		}

		var newWindow = safari.application.openBrowserWindow();
		for (var i = newTabs.length - 1; i >= 0; i--) {
			if (i == newTabs.length - 1) {
				newWindow.activeTab.url = newTabs[i];
			} else {
				var newTab = newWindow.openTab();
				newTab.url = newTabs[i];
			}
		}
	}
}

function validateCommand(event)
{
	if (event.command === "OpenNewWindow") {
		event.target.disabled = event.target.browserWindow.tabs.length < 2;
	}

}

safari.application.addEventListener("command", performCommand, false);
safari.application.addEventListener("validate", validateCommand, false);