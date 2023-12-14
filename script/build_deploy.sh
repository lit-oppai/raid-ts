#!/bin/bash

#运行 pnpm 命令
pnpm run build

#检查构建是否成功
if [ $? -eq 0 ]; then
    echo "success!"

    #将构建输出复制到指定路径
    cp -rf build/sysroot/* /

    echo "Complete deployment."
else
    echo "Deployment failure."
fi