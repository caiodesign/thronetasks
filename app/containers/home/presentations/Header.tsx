import { ThemeButtons } from "@/components/ThemeButtons";

export default function Header() {
  return (
    <section className="mx-auto flex flex-col items-start gap-2 px-4 py-4 pb-0 md:py-12 md:pb-8 lg:py-12 lg:pb-10 w-full">
      <h1 className="text-2xl font-black leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        Throne and Liberty Tasks
      </h1>

      <p className="text-md font-light text-foreground md:text-lg">
        <a
          className="underline underline-offset-4 hover:text-primary"
          href="mailto:colive.dev@gmail.com"
        >
          Send
        </a>{" "}
        us your suggestions! <br className="md:hidden" />
        You can also{" "}
        <a
          className="underline underline-offset-4 hover:text-primary"
          href="https://www.paypal.com/donate/?hosted_button_id=XX88ARK7PHRYA"
          target="_blank"
        >
          donate
        </a>{" "}
        to support the development of new features.
      </p>
      <ThemeButtons size={20} />
    </section>
  );
}
