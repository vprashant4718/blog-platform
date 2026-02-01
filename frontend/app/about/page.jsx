export const metadata = {
  title: "About Us | My Tech Blog",
  description: "We are a team of developers sharing knowledge on Full Stack Development.",
};

export default function About() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to the ultimate resource for Full Stack Developers. Our mission is to provide 
        high-quality tutorials on the MERN stack, Next.js, and modern web architecture.
      </p>
    </div>
  );
}