function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
        Welcome to Gazi's Portfolio
      </h1>
      <p className="text-xl text-gray-600 text-center max-w-2xl mb-8">
        I'm a 3D artist and developer specializing in creating immersive digital experiences and innovative solutions
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-2">3D Modeling</h3>
          <p className="text-gray-600">Expert in creating detailed 3D models and architectural visualizations</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Development</h3>
          <p className="text-gray-600">Full-stack developer with expertise in modern web technologies</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Design</h3>
          <p className="text-gray-600">Creating intuitive and beautiful user experiences</p>
        </div>
      </div>
    </div>
  );
}

export default Home;