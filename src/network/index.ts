import { api, useInstance } from '@icewhale/ui-utils';
import { Configuration, DiskMethodsApi, MergeMethodsApi, MountMethodsApi, StorageMethodsApi, RaidMethodsApi } from "@icewhale/zimaos-localstorage-openapi";
import { NetworkMethodsApi, ZerotierMethodsApi, DeviceMethodsApi } from "@icewhale/zimaos-openapi"
import { DriveMethodsApi } from "@icewhale/icewhale-openapi/generate/icewhale-drive";
import { DefaultApi as InstallApi } from "@icewhale/casaos-installer-openapi";

const instance = useInstance();
const configuration = new Configuration({
    accessToken: localStorage.getItem("access_token") ?? "",
});
const prefix = "/v2/local_storage";

// TODO: instance 的配置项与 codegen 生成代码类似，可以考虑使用 codegen 生成代码。删除 instance。
export const disk = new DiskMethodsApi(configuration, prefix, instance);
export const merge = new MergeMethodsApi(configuration, prefix, instance);
export const mount = new MountMethodsApi(configuration, prefix, instance);
export const raid = new RaidMethodsApi(configuration, prefix, instance);
export const storage = new StorageMethodsApi(configuration, prefix, instance);

export const network = new NetworkMethodsApi(configuration, "/v2/zimaos", instance);
export const zerotier = new ZerotierMethodsApi(configuration, "/v2/zimaos", instance);
export const device = new DeviceMethodsApi(configuration, "/v2/zimaos", instance);
export const drive = new DriveMethodsApi(configuration, "/v2/icewhale", instance);

export const install = new InstallApi(configuration, "/v2/installer", instance);

export {
    api,
};
