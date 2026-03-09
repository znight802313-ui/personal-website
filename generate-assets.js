const API_KEY = 'sk-kBpMWgkqqJrTGrDw9Dgntt6lz4xVKpZ6nFFuE2Uwb4AQnnD6';
const API_HOST = 'https://api.newcoin.tech';
const MODEL_ID = 'jimeng-4.5';

async function generateWebsiteAssets() {
  const prompts = {
    avatar: '可爱的Q版女孩插画，ENFP性格特征，双鱼座元素，温暖活泼的表情，手绘水彩风格，柔和的色调',
    background: '温暖的水彩画背景，奶油白色调，带有淡淡的纸张纹理，柔和的暖阳橘色和鼠尾草绿色渐变，手绘风格',
    road214: '214国道沿途风景，狼毒花盛开的山坡，远处的雪山，蓝天白云，水彩画风格，温暖柔和的色调'
  };

  for (const [name, prompt] of Object.entries(prompts)) {
    try {
      console.log(`\n🎨 正在生成: ${name}`);
      console.log(`📝 提示词: ${prompt}\n`);

      const response = await fetch(`${API_HOST}/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL_ID,
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'url'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ ${name} 生成失败:`, response.status);
        console.error('错误详情:', errorText);
        continue;
      }

      const data = await response.json();
      console.log(`✅ ${name} 生成成功!`);
      console.log(`🖼️  图片数量: ${data.data.length}`);
      console.log(`🔗 第一张图片: ${data.data[0].url}\n`);

      // 等待 2 秒避免请求过快
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`❌ ${name} 发生错误:`, error.message);
    }
  }

  console.log('\n✨ 所有图片生成完成！');
}

generateWebsiteAssets();
