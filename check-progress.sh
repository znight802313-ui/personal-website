#!/bin/bash

echo "📊 检查素材生成状态..."
echo ""

OUTPUT_FILE="/private/tmp/claude-501/-Users-zengweiguo-Downloads---------------/tasks/blfs26pyl.output"

if [ -f "$OUTPUT_FILE" ]; then
    # 统计成功数量
    SUCCESS_COUNT=$(grep -c "✅ 生成成功" "$OUTPUT_FILE")
    echo "✅ 已成功生成: $SUCCESS_COUNT 组素材"
    echo ""

    # 显示最后几行
    echo "📝 最新进度:"
    tail -20 "$OUTPUT_FILE"
else
    echo "❌ 输出文件不存在"
fi
