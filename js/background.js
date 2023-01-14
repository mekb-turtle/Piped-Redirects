window.browser = window.browser || window.chrome;

const instanceHost = "invidious.garudalinux.org";

browser.webRequest.onBeforeRequest.addListener(
	(details) => {
		const url = new URL(details.url);
		if (url.hostname.endsWith("youtu.be") && url.pathname.length > 1) {
			return { redirectUrl: "https://" + instanceHost + "/watch?v=" + url.pathname.substr(1) };
		}
		if (url.hostname.endsWith("youtube.com") || url.hostname.endsWith("youtube-nocookie.com")) {
			if (url.protocol == "http:") url.protocol = "https:";
			url.hostname = instance;
			return { redirectUrl: url.href };
		}
	},
	{
		urls: ["<all_urls>"],
	},
	["blocking"],
);
