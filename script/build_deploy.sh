#!/bin/bash
#获取 env 
source .env.local

#运行 pnpm 命令
pnpm run build

#检查构建是否成功
if [ $? -eq 0 ]; then
    echo "success!"

    #将构建输出复制到指定路径
    cp -rf build/sysroot/* /

    echo "Complete deployment."
    if [ $? -eq 0 ]; then
        curl -X POST -H "Content-Type: application/json" -d '{"msg_type":"text","content":{"text":"IceWhale-Settings-UI updated 本地更新"}}' https://open.feishu.cn/open-apis/bot/v2/hook/$NOTICE_KEY
        echo "\n\t successfully sent notice message."
    fi

else
    echo "Deployment failure."
fi
