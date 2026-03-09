import { useState } from 'react';
import { generateImage, websiteImagePrompts } from '../utils/imageGenerator';

export default function ImageGeneratorTest() {
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]); // 改为数组支持多张图片
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入图片描述');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const imageUrls = await generateImage(prompt, { returnAll: true }); // 获取所有图片
      setGeneratedImages(Array.isArray(imageUrls) ? imageUrls : [imageUrls]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUsePreset = async (presetKey) => {
    const presetPrompt = websiteImagePrompts[presetKey];
    setPrompt(presetPrompt);
    setLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const imageUrls = await generateImage(presetPrompt, { returnAll: true });
      setGeneratedImages(Array.isArray(imageUrls) ? imageUrls : [imageUrls]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmOrange/10 to-sageGreen/10 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-handwriting text-4xl text-warmOrange mb-8 text-center">
          🎨 图片生成测试工具
        </h1>

        {/* 输入区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <label className="block font-rounded text-earthBrown mb-2">
            图片描述提示词：
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 p-4 border-2 border-sageGreen/30 rounded-lg font-rounded resize-none focus:outline-none focus:border-warmOrange"
            placeholder="描述你想要生成的图片..."
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 px-8 py-3 bg-warmOrange text-white rounded-full font-handwriting text-lg hover:bg-warmOrange/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? '生成中...' : '生成图片'}
          </button>
        </div>

        {/* 预设提示词 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-handwriting text-2xl text-earthBrown mb-4">
            📋 预设提示词
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.keys(websiteImagePrompts).map((key) => (
              <button
                key={key}
                onClick={() => handleUsePreset(key)}
                disabled={loading}
                className="px-4 py-2 bg-sageGreen/20 rounded-lg font-rounded text-sm hover:bg-sageGreen/30 disabled:opacity-50 transition-all text-left"
              >
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-rounded">❌ {error}</p>
          </div>
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-8 mb-6 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-blue-700 font-rounded">正在生成图片，请稍候...</p>
          </div>
        )}

        {/* 生成的图片 */}
        {generatedImages.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-handwriting text-2xl text-earthBrown mb-4">
              ✨ 生成结果 ({generatedImages.length} 张图片)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedImages.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Generated ${index + 1}`}
                    className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  />
                  <div className="mt-3 flex gap-2">
                    <a
                      href={imageUrl}
                      download={`generated-image-${index + 1}.png`}
                      className="flex-1 px-4 py-2 bg-sageGreen text-white rounded-full font-handwriting text-sm text-center hover:bg-sageGreen/90 transition-all"
                    >
                      下载
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(imageUrl);
                        alert('链接已复制！');
                      }}
                      className="flex-1 px-4 py-2 bg-earthBrown/20 text-earthBrown rounded-full font-handwriting text-sm hover:bg-earthBrown/30 transition-all"
                    >
                      复制
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-8 bg-white/50 rounded-lg p-6">
          <h3 className="font-handwriting text-xl text-earthBrown mb-3">
            💡 使用说明
          </h3>
          <ul className="font-rounded text-earthBrown/70 space-y-2 list-disc list-inside">
            <li>输入详细的图片描述，包括风格、色调、元素等</li>
            <li>可以使用预设提示词快速生成网站所需素材</li>
            <li>生成的图片可以直接下载使用</li>
            <li>建议使用中文描述，效果更好</li>
            <li>如果生成失败，可能是服务暂时不可用，请稍后重试</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
