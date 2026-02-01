export const metadata = {
  title: "About Us | My Tech Blog",
  description: "We are a team of developers sharing knowledge on Full Stack Development.",
};

export default function About() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-700 mb-4">
       Welcome to Real Blogs, a modern content platform built to inform, inspire, and empower readers with high-quality, well-researched articles.

At Real Blogs, we believe that good content should do more than just exist on the internet — it should solve problems, answer real questions, and add value to everyday life. Our goal is to create meaningful blogs that are easy to understand, SEO-friendly, and genuinely helpful.
      </p>
    </div>
  );
}