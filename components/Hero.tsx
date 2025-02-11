import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-background py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Generate Awesome Code</h1>
        <p className="text-xl mb-8 text-muted-foreground">
          Create clean, efficient code snippets with just a few clicks.
        </p>
        <Button size="lg">Get Started</Button>
      </div>
    </section>
  )
}

