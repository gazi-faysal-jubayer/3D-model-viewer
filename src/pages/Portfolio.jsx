import { useState, useEffect } from 'react';
import ModelViewer from '../components/ModelViewer';

function Portfolio() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/models');
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('model-file', file);

    if (file.name.endsWith('.zip')) {
      const entrypoint = window.prompt('Please enter the filename of the main design inside the archive.');
      if (!entrypoint) return;
      formData.append('model-zip-entrypoint', entrypoint);
    }

    setUploadStatus('Uploading...');

    try {
      const response = await fetch('/api/models', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      setUploadStatus('Upload successful!');
      fetchModels();
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">3D Portfolio</h2>
        <div className="relative">
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="model-upload"
            accept=".rvt,.rfa,.ipt,.iam,.dwf,.dwfx,.f3d,.nwd,.3dm,.zip"
          />
          <label
            htmlFor="model-upload"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Upload Model
          </label>
          {uploadStatus && (
            <p className="absolute top-full mt-2 text-sm">
              {uploadStatus}
            </p>
          )}
        </div>
      </div>

      {models.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {models.map((model) => (
            <div key={model.urn} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{model.name}</h3>
                <div className="h-[60vh] bg-gray-50 rounded">
                  <ModelViewer urn={model.urn} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No models uploaded yet. Upload your first 3D model to get started!</p>
        </div>
      )}
    </div>
  );
}

export default Portfolio;