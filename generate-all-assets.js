const API_KEY = 'sk-kBpMWgkqqJrTGrDw9Dgntt6lz4xVKpZ6nFFuE2Uwb4AQnnD6';
const API_HOST = 'https://api.newcoin.tech';
const MODEL_ID = 'jimeng-4.5';

// 优化后的高质量提示词
const websiteAssets = {
  // 1. 首页背景 - 温暖的水彩纹理
  homeBackground: {
    prompt: '抽象水彩画背景，奶油白色为主，暖阳橘色和鼠尾草绿色的柔和渐变，带有自然的水彩晕染效果和纸张纹理，极简主义，高级感，温暖治愈系，适合作为网页背景',
    filename: 'home-background'
  },

  // 2. 拍立得相框装饰
  polaroidFrame: {
    prompt: '手绘风格的拍立得照片框，带有手撕胶带装饰，复古怀旧感，温暖的米色调，细腻的纸张质感，周围有手绘的小星星和涂鸦元素，文艺清新',
    filename: 'polaroid-frame'
  },

  // 3. 214国道风景 - 狼毒花盛开
  road214Scenery: {
    prompt: '214国道沿途壮丽风景，前景是大片盛开的粉红色狼毒花海，中景是蜿蜒的公路，远景是巍峨的雪山和蓝天白云，水彩画风格，色彩饱和度高，充满生命力和自由感，电影级构图',
    filename: 'road-214-scenery'
  },

  // 4. 黑颈鹤优雅起舞
  blackNeckedCrane: {
    prompt: '优雅的黑颈鹤在纳帕海湿地翩翩起舞，展翅飞翔的瞬间，背景是金色的夕阳和芦苇丛，水彩画风格，动态美感，柔和的光影，充满诗意和灵动感',
    filename: 'black-necked-crane'
  },

  // 5. 手作陶器特写
  handmadePottery: {
    prompt: '精美的手工陶器特写，温暖的大地色调，展现陶土的细腻纹理和手作的温度，柔和的自然光线，极简构图，侧面光影，高级质感，治愈系美学',
    filename: 'handmade-pottery'
  },

  // 6. 装饰元素 - 野草剪影
  wildGrassDecor: {
    prompt: '随风摇曳的野草和芦苇剪影，极简线条画，单色墨绿色，优雅的曲线，适合作为网页装饰元素，留白艺术，禅意美学',
    filename: 'wild-grass-decor'
  },

  // 7. 装饰元素 - 手绘星星
  starsDecor: {
    prompt: '手绘风格的小星星和闪光元素，温暖的金色和橘色，可爱俏皮，适合作为悬停动画装饰，透明背景，发光效果',
    filename: 'stars-decor'
  },

  // 8. 文章封面 - 生活碎片
  articleLifeCover: {
    prompt: '温暖的生活场景插画，手账风格，一杯咖啡、笔记本、干花、阳光洒在桌面上，柔和的色彩，充满生活气息和小确幸，俯视构图，治愈系',
    filename: 'article-life-cover'
  },

  // 9. 文章封面 - 技术思考
  articleTechCover: {
    prompt: '简约的技术主题插画，抽象的代码流动效果，几何图形和线条，现代感，但保持温暖的橘色和绿色配色，科技与人文的融合，扁平化设计',
    filename: 'article-tech-cover'
  },

  // 10. 作品集背景 - 画廊墙
  portfolioWall: {
    prompt: '艺术画廊的白色墙面纹理，柔和的自然光影，细腻的墙面质感，极简主义，高级感，适合展示作品的背景',
    filename: 'portfolio-wall'
  },

  // 11. 雪山之巅
  snowMountain: {
    prompt: '梅里雪山日照金山的壮丽景象，金色的阳光照亮雪峰，云海翻腾，水彩画风格，色彩层次丰富，震撼的自然美景，广角构图',
    filename: 'snow-mountain'
  },

  // 12. 旅行元素 - 帐篷露营
  campingTent: {
    prompt: '温馨的露营场景，帐篷、篝火、星空，手绘插画风格，温暖的橘色光芒，治愈系，充满冒险和自由的氛围',
    filename: 'camping-tent'
  },

  // 13. 音乐元素 - 黑胶唱片
  vinylRecord: {
    prompt: '复古的黑胶唱片正在播放，手绘风格，温暖的色调，音符飘散在空中，怀旧感，音乐与生活的美好',
    filename: 'vinyl-record'
  },

  // 14. 游戏元素 - 蔡文姬琴
  caiWenjiHarp: {
    prompt: '王者荣耀蔡文姬的胡笳琴，精美的乐器特写，古风元素，柔和的光影，水彩画风格，优雅唯美',
    filename: 'caiwenji-harp'
  }
};

async function generateAllAssets() {
  console.log('🎨 开始生成网站素材...\n');
  console.log(`📦 总共需要生成 ${Object.keys(websiteAssets).length} 组素材\n`);
  console.log('⏱️  预计耗时: ${Object.keys(websiteAssets).length * 3} 秒\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = {};
  let successCount = 0;
  let failCount = 0;

  for (const [key, asset] of Object.entries(websiteAssets)) {
    try {
      console.log(`\n🎨 [${successCount + failCount + 1}/${Object.keys(websiteAssets).length}] 正在生成: ${key}`);
      console.log(`📝 提示词: ${asset.prompt.substring(0, 60)}...`);

      const response = await fetch(`${API_HOST}/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL_ID,
          prompt: asset.prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'url'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ 生成失败: ${response.status}`);
        failCount++;
        results[key] = { success: false, error: errorText };
        continue;
      }

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        results[key] = {
          success: true,
          filename: asset.filename,
          images: data.data.map(item => item.url),
          count: data.data.length
        };

        console.log(`✅ 生成成功! (${data.data.length} 张图片)`);
        console.log(`🔗 第一张: ${data.data[0].url.substring(0, 80)}...`);
        successCount++;
      }

      // 等待 2.5 秒避免请求过快
      await new Promise(resolve => setTimeout(resolve, 2500));

    } catch (error) {
      console.error(`❌ 发生错误: ${error.message}`);
      failCount++;
      results[key] = { success: false, error: error.message };
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✨ 素材生成完成！\n');
  console.log(`📊 统计信息:`);
  console.log(`   ✅ 成功: ${successCount} 组`);
  console.log(`   ❌ 失败: ${failCount} 组`);
  console.log(`   📦 总计: ${Object.keys(websiteAssets).length} 组\n`);

  // 输出所有成功的图片链接
  console.log('🖼️  所有图片链接:\n');
  for (const [key, result] of Object.entries(results)) {
    if (result.success) {
      console.log(`\n【${key}】 (${result.count} 张)`);
      result.images.forEach((url, index) => {
        console.log(`  ${index + 1}. ${url}`);
      });
    }
  }

  return results;
}

generateAllAssets();
