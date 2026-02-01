export const metadata = {
  title: "Contact Us | My Tech Blog",
  description: "Get in touch with us for collaborations and inquiries.",
};

export default function Contact() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Have questions? Email us at contact@example.com</p>
      
      <form className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" />
        <input type="email" placeholder="Your Email" className="w-full border p-2 rounded" />
        <textarea placeholder="Message" className="w-full border p-2 rounded h-32"></textarea>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Send Message</button>
      </form>
    </div>
  );
}