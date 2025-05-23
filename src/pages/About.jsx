function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Professional Summary</h3>
          <p className="text-gray-700">
            [Your professional summary here]
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded">3D Modeling</div>
            <div className="bg-gray-50 p-3 rounded">Animation</div>
            <div className="bg-gray-50 p-3 rounded">Texturing</div>
            <div className="bg-gray-50 p-3 rounded">Web Development</div>
            <div className="bg-gray-50 p-3 rounded">UI/UX Design</div>
            <div className="bg-gray-50 p-3 rounded">Project Management</div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Education</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Degree Name</h4>
              <p className="text-gray-600">University Name</p>
              <p className="text-gray-500">Graduation Year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;