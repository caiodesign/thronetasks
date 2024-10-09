export default function Footer() {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground mt-3">
      Developed with ❤️ by{" "}
      <a
        className="underline underline-offset-4 hover:text-primary"
        href="https://github.com/caiodesign"
        target="_blank"
        rel="noopener noreferrer"
      >
        Caio
      </a>
      . No ads.{" "}
      <a
        className="underline underline-offset-4 hover:text-primary"
        href="https://www.paypal.com/donate/?hosted_button_id=XX88ARK7PHRYA"
        rel="noopener noreferrer"
        target="_blank"
      >
        Support us
      </a>
    </p>
  );
}
