import { useState, useEffect } from 'react';
import { initViewer, loadModel } from '../viewer';

function Portfolio() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch models');
        }
        const data = await response.json();
        setModels(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError(error.message);
      }
    };

    fetchModels();
  }, []);

  useEffect(() => {
    if (selectedModel) {
      const container = document.getElementById('modelViewer');
      initViewer(container).then(viewer => {
        loadModel(viewer, selectedModel.urn);
      });
    }
  }, [selectedModel]);

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

    try {
      const response = await fetch('/api/models', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload model');
      }

      const result = await response.json();
      setModels(prev => [...prev, result]);
      setError(null);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">3D Portfolio</h2>
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
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div key={model.urn} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{model.name}</h3>
              <button
                onClick={() => setSelectedModel(model)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Model
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
            <button
              onClick={() => setSelectedModel(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
            >
              Close
            </button>
            <div className="h-full" id="modelViewer"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;