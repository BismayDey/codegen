import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CodeGenerator from "@/components/CodeGenerator";
import CodeGallery from "@/components/CodeGallery";
import CodeEditor from "@/components/CodeEditor";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CodeGenerator />
        <CodeGallery />
        <CodeEditor />
      </main>
      <Footer />
    </div>
  );
}
