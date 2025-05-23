import { useState, useEffect } from 'react';
import { initViewer, loadModel } from '../viewer';

function Portfolio() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models');
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">3D Portfolio</h2>
      
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh]">
            <div className="h-full" id="modelViewer"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;