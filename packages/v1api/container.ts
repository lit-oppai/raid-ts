import { api } from "@icewhale/ui-utils";

const PREFIX = "/v1/container"

const container = {
    getHardwareUsage() {
        return api.get(`${PREFIX}/usage`);
    },
}

export default container;
