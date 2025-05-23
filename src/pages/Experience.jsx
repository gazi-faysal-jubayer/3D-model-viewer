function Experience() {
  const experiences = [
    {
      title: "Senior 3D Artist",
      company: "Creative Solutions Studio",
      period: "2022 - Present",
      description: "Lead 3D artist responsible for creating high-quality architectural visualizations and interactive 3D models. Managed a team of junior artists and implemented efficient workflows."
    },
    {
      title: "Web Developer",
      company: "Tech Innovations Inc",
      period: "2020 - 2022",
      description: "Developed and maintained modern web applications using React and Three.js. Created interactive 3D experiences for web platforms."
    },
    {
      title: "3D Modeling Intern",
      company: "ArchViz Studio",
      period: "2019 - 2020",
      description: "Created detailed 3D models for architectural projects. Collaborated with senior designers to improve visualization techniques."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">{exp.title}</h3>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-gray-500 mb-4">{exp.period}</p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;