import Image from "next/image";
import getChannels from "./lib/slack/getChannels";
import ChannelSelector from "./components/channel-selector";
import { sendVideoMessage } from "./lib/slack/sendVideoMessage";

export default async function Home() {
  const isConfigured = process.env.SLACK_TOKEN ? true : false;
  const channels = await getChannels();
  console.log(channels);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Slack App Playground</h1>
      <div>
        {isConfigured ? (
          <span>✅ Slack Token Found</span>
        ) : (
          <span>❌ Missing Slack Token</span>
        )}
      </div>
      <ChannelSelector
        channels={channels}
        sendVideoMessage={sendVideoMessage}
      ></ChannelSelector>
    </main>
  );
}
