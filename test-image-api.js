const API_KEY = 'sk-kBpMWgkqqJrTGrDw9Dgntt6lz4xVKpZ6nFFuE2Uwb4AQnnD6';
const API_HOST = 'https://api.newcoin.tech';
const MODEL_ID = 'jimeng-4.5';

async function testImageGeneration() {
  try {
    console.log('🎨 测试图片生成 API...\n');

    const prompt = '一个温暖的手绘风格插画，展示一个漫游者在214国道上看到狼毒花盛开的场景，水彩画风格，柔和的色调，充满生命力';

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
      console.error('❌ API 请求失败:', response.status, response.statusText);
      console.error('错误详情:', errorText);
      return;
    }

    const data = await response.json();
    console.log('✅ API 调用成功!\n');
    console.log('📊 返回数据:', JSON.stringify(data, null, 2));

    if (data.data && data.data[0] && data.data[0].url) {
      console.log('\n🖼️  生成的图片 URL:');
      console.log(data.data[0].url);
    }

  } catch (error) {
    console.error('❌ 发生错误:', error.message);
    console.error('详细信息:', error);
  }
}

testImageGeneration();
