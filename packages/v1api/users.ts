import { api } from "@icewhale/ui-utils";

const PREFIX1 = "/v1/users";
const PREFIX2 = "/v2/users";

const users = {
	// get all user name [OK]
	getAllUserName() {
		return api.get(`${PREFIX1}/name`);
	},

	// delete all user [NOT USE]
	deleteAllUser() {
		return api.delete(`${PREFIX1}`);
	},
	// get user status [OK]
	getUserStatus() {
		return api.get(`${PREFIX1}/status`);
	},

	// get user current info [OK]
	getUserInfo() {
		return api.get(`${PREFIX1}/current`);
	},
	// set user current info [OK]
	setUserInfo(data: { [key: string]: any }) {
		return api.put(`${PREFIX1}/current`, data);
	},
	// change user password [OK]
	changePassword(data: { [key: string]: any }) {
		return api.put(`${PREFIX1}/current/password`, data);
	},

	getLinkAppDetail() {
		return api.get(`${PREFIX1}/current/custom/link`);
	},

	saveLinkAppDetail(data: { [key: string]: any }) {
		return api.post(`${PREFIX1}/current/custom/link`, data);
	},

	// delete user [NOT USE]
	deleteUser(id: number) {
		return api.delete(`${PREFIX1}/${id}`);
	},

	// get user image [NOT USE]
	getUserImage(path: string) {
		return api.get(`${PREFIX1}/image`, { path });
	},

	// create or update user image from upload
	setUserImage(key: string, data: { [key: string]: any }) {
		return api.put(`${PREFIX1}/current/image/${key}`, data);
	},

	// delete user image [NOT USE]
	deleteUserImage(path: string) {
		return api.delete(`${PREFIX1}/current/image`, { path });
	},

	// get custom storage [OK]
	// free store GET
	getCustomStorage(key: string) {
		return api.get(`${PREFIX1}/current/custom/${key}`);
	},

	// set or update custom storage  [OK]
	// free store POST
	setCustomStorage(key: string, data: { [key: string]: any }) {
		return api.post(`${PREFIX1}/current/custom/${key}`, data);
	},

	// delete custom storage  [NOT USE]
	deleteCustomStorage(key: string) {
		return api.delete(`${PREFIX1}/current/custom/${key}`);
	},

	// get user info by user name  [NOT USE]
	getUserInfoByName(username: string) {
		return api.get(`${PREFIX1}/${username}`);
	},

	// register [OK]
	register(username: string, password: string, key: string) {
		return api.post(`${PREFIX1}/register`, { username, password, key });
	},

	// login [OK]
	login(username: string, password: string) {
		return api.post(`${PREFIX1}/login`, { username, password });
	},

	// refresh token [OK]
	refreshToken(refresh_token: string) {
		return api.post(`${PREFIX1}/refresh`, { refresh_token });
	},

	// get shutcut [OK]
	getShutcutDetail() {
		return api.get(`${PREFIX1}/current/custom/shortcut`);
	},

	// save shutcut [OK]
	saveShutcutDetail(data: { [key: string]: any }) {
		return api.post(`${PREFIX1}/current/custom/shortcut`, data);
	},

	// get user letter [OK]
	getLetter() {
		return api.get(`${PREFIX2}/events`);
	},

	// delete letter [OK]
	delLetter(uuid: string) {
		return api.delete(`${PREFIX2}/event/${uuid}`);
	},

	// put user head portrait
	putHeadPortrait(data: { [key: string]: any }) {
		return api.put(`${PREFIX1}/avatar`, data);
	},
}

export default users;
