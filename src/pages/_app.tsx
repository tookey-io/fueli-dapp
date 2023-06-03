import "focus-visible";
import "../styles/tailwind.css";
import { ChainProviders } from "@/wagmi/providers";

export default function App({ Component, pageProps }: any) {
  return (
    <ChainProviders>
      <Component {...pageProps} />
    </ChainProviders>
  );
}
