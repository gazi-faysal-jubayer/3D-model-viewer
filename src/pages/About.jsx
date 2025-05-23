function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Professional Summary</h3>
          <p className="text-gray-700">
            I am a passionate 3D artist and developer with extensive experience in creating immersive digital experiences. 
            My expertise spans across 3D modeling, web development, and user interface design, allowing me to bring creative 
            visions to life through technology.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">3D Modeling</div>
            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">Animation</div>
            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">Texturing</div>
            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">Web Development</div>
            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">UI/UX Design</div>
            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">Project Management</div>
            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">React</div>
            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">Three.js</div>
            <div className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">AutoCAD</div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Education</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-medium">Bachelor of Architecture</h4>
              <p className="text-gray-600">University of Engineering and Technology</p>
              <p className="text-gray-500">2018 - 2022</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-medium">3D Visualization Certification</h4>
              <p className="text-gray-600">Autodesk Certified Professional</p>
              <p className="text-gray-500">2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;