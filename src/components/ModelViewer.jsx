import { useEffect, useRef } from 'react';

function ModelViewer({ urn }) {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    async function getAccessToken() {
      const response = await fetch('/api/auth/token');
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const { access_token, expires_in } = await response.json();
      return { accessToken: access_token, expiresIn: expires_in };
    }

    async function initializeViewer() {
      const options = {
        env: 'AutodeskProduction',
        getAccessToken: (callback) => {
          getAccessToken().then(({ accessToken, expiresIn }) => {
            callback(accessToken, expiresIn);
          });
        }
      };

      Autodesk.Viewing.Initializer(options, () => {
        const config = {
          extensions: ['Autodesk.DocumentBrowser']
        };
        viewerRef.current = new Autodesk.Viewing.GuiViewer3D(containerRef.current, config);
        viewerRef.current.start();
        viewerRef.current.setTheme('light-theme');
        
        if (urn) {
          loadModel(urn);
        }
      });
    }

    async function loadModel(urn) {
      const documentId = 'urn:' + urn;
      Autodesk.Viewing.Document.load(documentId, (doc) => {
        const defaultViewable = doc.getRoot().getDefaultGeometry();
        viewerRef.current.loadDocumentNode(doc, defaultViewable);
      }, (error) => {
        console.error('Error loading document:', error);
      });
    }

    initializeViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.finish();
      }
    };
  }, [urn]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '60vh' }} />
  );
}

export default ModelViewer;