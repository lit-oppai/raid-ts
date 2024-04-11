import { api, useInstance }                                                                                                                         from '@icewhale/ui-utils';
import { Configuration, DiskMethodsApi, MergeMethodsApi, MountMethodsApi, StorageMethodsApi, RaidMethodsApi }                                       from "@icewhale/zimaos-localstorage-openapi";
import { NetworkMethodsApi, ZeroTierMethodsApi, DeviceMethodsApi }                                                                                  from "@icewhale/zimaos-openapi"
import { DriveMethodsApi }                                                                                                                          from "@icewhale/icewhale-openapi/generate/icewhale-drive";
import { DefaultApi as InstallApi }                                                                                                                 from "@icewhale/casaos-installer-openapi";
import { AppStoreMethodsApi, ComposeMethodsApi }                                                                                                    from "@icewhale/casaos-appmanagement-openapi";

const instance = useInstance();
const configuration = new Configuration({
    accessToken: localStorage.getItem("access_token") ?? "",
});
const prefix = "/v2/local_storage";

// TODO: instance 的配置项与 codegen 生成代码类似，可以考虑使用 codegen 生成代码。删除 instance。
export const diskAPI = new DiskMethodsApi(configuration, prefix, instance);
export const mergeAPI = new MergeMethodsApi(configuration, prefix, instance);
export const mountAPI = new MountMethodsApi(configuration, prefix, instance);
export const raidAPI = new RaidMethodsApi(configuration, prefix, instance);
export const storageAPI = new StorageMethodsApi(configuration, prefix, instance);

export const networkAPI = new NetworkMethodsApi(configuration, "/v2/zimaos", instance);
export const zerotierAPI = new ZeroTierMethodsApi(configuration, "/v2/zimaos", instance);
export const deviceAPI = new DeviceMethodsApi(configuration, "/v2/zimaos", instance);
export const driveAPI = new DriveMethodsApi(configuration, "/v2/icewhale", instance);
export const appStoreAPI = new AppStoreMethodsApi(configuration, "/v2/appmanagement", instance);
export const composeApi = new ComposeMethodsApi(configuration, "/v2/appmanagement", instance);

export const install = new InstallApi(configuration, "/v2/installer", instance);

export {
    api,
};
