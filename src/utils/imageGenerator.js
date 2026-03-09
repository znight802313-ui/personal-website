/**
 * 图片生成工具
 * 用于在网页设计过程中生成素材
 */

const IMAGE_API_CONFIG = {
  apiKey: 'sk-kBpMWgkqqJrTGrDw9Dgntt6lz4xVKpZ6nFFuE2Uwb4AQnnD6',
  apiHost: 'https://api.newcoin.tech',
  model: 'jimeng-4.5',
  defaultSize: '1024x1024'
};

/**
 * 生成图片
 * @param {string} prompt - 图片描述提示词
 * @param {Object} options - 可选配置
 * @returns {Promise<string|string[]>} 返回图片 URL 或 URL 数组
 */
export async function generateImage(prompt, options = {}) {
  const {
    model = IMAGE_API_CONFIG.model,
    size = IMAGE_API_CONFIG.defaultSize,
    n = 1,
    returnAll = false // 是否返回所有生成的图片
  } = options;

  try {
    const response = await fetch(`${IMAGE_API_CONFIG.apiHost}/v1/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${IMAGE_API_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model,
        prompt,
        n,
        size,
        response_format: 'url'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`图片生成失败: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      // 如果要返回所有图片
      if (returnAll) {
        return data.data.map(item => item.url);
      }
      // 默认返回第一张
      return data.data[0].url;
    }

    throw new Error('未能获取图片 URL');
  } catch (error) {
    console.error('图片生成错误:', error);
    throw error;
  }
}

/**
 * 为个人网站生成特定风格的图片
 */
export const websiteImagePrompts = {
  // 首页背景
  homeBackground: '温暖的水彩画背景，奶油白色调，带有淡淡的纸张纹理，柔和的暖阳橘色和鼠尾草绿色渐变，手绘风格',

  // 拍立得照片框
  polaroidFrame: '手绘风格的拍立得相框，带有胶带装饰，温暖色调，复古感',

  // 关于我页面 - Q版人物
  avatarQVersion: '可爱的Q版人物插画，ENFP性格特征，双鱼座元素，温暖活泼的表情，手绘水彩风格',

  // 214国道风景
  road214Scenery: '214国道沿途风景，狼毒花盛开的山坡，远处的雪山，蓝天白云，水彩画风格，温暖柔和的色调',

  // 黑颈鹤
  blackNeckedCrane: '优雅的黑颈鹤在湿地起舞，水彩画风格，柔和的色调，充满生命力',

  // 手作陶器
  handmadePottery: '手工陶器特写，温暖的大地色调，展现手作的温度和纹理，柔和的光影',

  // 装饰元素 - 野草
  wildGrass: '随风摇曳的野草剪影，简约手绘风格，单色线条，适合作为装饰元素',

  // 装饰元素 - 星星
  decorativeStars: '手绘风格的小星星，温暖的金色，适合作为悬停动画装饰',

  // 文章封面 - 生活碎片
  articleLifeStyle: '温暖的生活场景插画，手账风格，柔和的色彩，充满生活气息',

  // 文章封面 - 技术思考
  articleTech: '简约的技术主题插画，代码元素，现代感，但保持温暖的色调',

  // 作品集背景
  portfolioBackground: '画廊墙纹理，白色墙面，柔和的光影，适合展示作品'
};

/**
 * 批量生成网站所需的图片
 */
export async function generateWebsiteImages() {
  const results = {};

  for (const [key, prompt] of Object.entries(websiteImagePrompts)) {
    try {
      console.log(`正在生成: ${key}...`);
      const imageUrl = await generateImage(prompt);
      results[key] = imageUrl;
      console.log(`✅ ${key} 生成成功`);

      // 避免请求过快
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ ${key} 生成失败:`, error.message);
      results[key] = null;
    }
  }

  return results;
}

/**
 * 下载图片到本地
 */
export async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);

    console.log(`✅ 图片已下载: ${filename}`);
  } catch (error) {
    console.error(`❌ 下载失败:`, error);
  }
}

// 使用示例
/*
// 生成单张图片
const imageUrl = await generateImage('一个温暖的手绘风格插画');

// 生成网站所有图片
const images = await generateWebsiteImages();
console.log('生成的图片:', images);

// 下载图片
await downloadImage(imageUrl, 'my-image.png');
*/
