import Auther from "./components/Auther";
import Socket from "./components/Socket";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


export default async function Home() {



  return (
    <>
      <div className="mt-20">
        {/* <Auther /> */}
        <Analytics />
        <SpeedInsights/>
        <Socket />
      </div>
    </>
  );
}
