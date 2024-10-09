export default function Header() {
  return (
    <section className="mx-auto flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10 w-full">
      <h1 className="text-3xl font-black leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] hidden md:block">
        Throne and Liberty reminder
      </h1>
      <p className=" text-lg font-light text-foreground">
        <a
          className="underline underline-offset-4 hover:text-primary"
          href="mailto:caiooliveiras@live.com"
        >
          Send
        </a>{" "}
        us your suggestions! You can also{" "}
        <a className="underline underline-offset-4 hover:text-primary" href="#">
          donate
        </a>{" "}
        to support the development of new features.
      </p>
    </section>
  );
}
