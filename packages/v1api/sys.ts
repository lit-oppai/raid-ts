// old none openAPI mirgartion code:

import { api } from "@icewhale/ui-utils";

const PREFIX = "/v1/sys";
const V1 = "/v1";

const sys = {
	// Get websocket port
	getSocketPort() {
		return api.get(`${PREFIX}/socket-port`);
	},

	// Check if need init
	guideCheck() {
		return api.get(`${PREFIX}/state`);
	},

	// check system version
	getVersion() {
		return api.get(`${PREFIX}/version`);
	},

	// Hardware Info
	hardwareInfo() {
		return api.get(`${PREFIX}/hardware`)
	},

	// get cpu info
	getCpuInfo() {
		return api.get(`${PREFIX}/cpu`);
	},

	// get disk info
	getDiskInfo() {
		return api.get(`${PREFIX}/disk`);
	},

	// get memory info
	getMemoryInfo() {
		return api.get(`${PREFIX}/mem`);
	},

	// get network info
	getNetworkInfo() {
		return api.get(`${PREFIX}/network`);
	},

	// get logs
	getLogs() {
		return api.get(`${PREFIX}/logs`);
	},

	//Get Debug Info
	getDebugInfo() {
		return api.get(`${PREFIX}/debug`);
	},

	// get system utilization
	getUtilization() {
		return api.get(`${PREFIX}/utilization`);
	},

	// proxy request
	getProxyRequestContent(url: string) {
		return api.get(`${PREFIX}/proxy`, { url })
	},

	// get casaos server port
	getServerPort() {
		return api.get(`${V1}/gateway/port`);
	},

	// edit casaos server port
	editServerPort(data: { [key: string]: any }) {
		return api.put(`${V1}/gateway/port`, data);
	},

	// get usb status
	getUsbStatus() {
		return api.get(`${V1}/usb/usb-auto-mount`);
	},

	// Toggle usb auto-mount
	toggleUsbAutoMount(data: { [key: string]: any }) {
		return api.put(`${V1}/usb/usb-auto-mount`, data);
	},

	// update CasaOS
	updateCasaOS() {
		return api.post(`${PREFIX}/update`);
	},

	// stop casaos
	stopCasaOS() {
		return api.post(`${PREFIX}/stop`);
	},

	//Check web ui Port
	checkUiPort(url: string) {
		return api.get(url);
	},

	// Get system apps
	getSystemApps() {
		return api.get(`${PREFIX}/apps-state`)
	},

	// Check ssh login
	checkSshLogin(data: { [key: string]: any }) {
		return api.post(`${PREFIX}/ssh-login`, data);
	},

	// power -- command:shutdown
	// power -- command:restart
	power(command: "off" | "restart") {
		return api.put(`${PREFIX}/state/${command}`);
	},

	getEntry() {
		return api.get(`${PREFIX}/entry`);
	},
}
export default sys;
