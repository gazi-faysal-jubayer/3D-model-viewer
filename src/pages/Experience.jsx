function Experience() {
  const experiences = [
    {
      title: "Position Title",
      company: "Company Name",
      period: "2020 - Present",
      description: "Description of your responsibilities and achievements"
    },
    // Add more experiences here
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
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