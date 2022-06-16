import { Footer } from 'flowbite-react';

export default function SiteFooter() {
  return (
    <Footer>
      <Footer.Copyright href="/" by="Ming™" year={2022} />
      <Footer.LinkGroup className="mt-3 flex-wrap items-center text-sm sm:mt-0">
        <Footer.Link href="/site-policy/terms-of-service">
          Terms of service
        </Footer.Link>
        <Footer.Link href="/site-policy/privacy-polices">
          Privacy Policy
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
