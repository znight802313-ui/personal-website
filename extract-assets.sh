#!/bin/bash

# 提取所有素材的第一张图片URL
OUTPUT_FILE="/private/tmp/claude-501/-Users-zengweiguo-Downloads---------------/tasks/blfs26pyl.output"

echo "export const generatedAssets = {"

# 提取每个素材的第一张图片
for asset in homeBackground polaroidFrame road214Scenery blackNeckedCrane handmadePottery wildGrassDecor starsDecor articleLifeCover articleTechCover portfolioWall snowMountain campingTent vinylRecord; do
    url=$(grep -A 4 "【${asset}】" "$OUTPUT_FILE" | grep "https://" | head -1 | sed 's/^[[:space:]]*[0-9]*\. //')
    if [ ! -z "$url" ]; then
        echo "  ${asset}: '${url}',"
    fi
done

echo "};"
