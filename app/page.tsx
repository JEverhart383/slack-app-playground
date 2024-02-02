import Image from "next/image";
import getChannels from "./lib/slack/getChannels";
import SlackIntegration from "./components/SlackIntegration";
import { sendVideoMessage } from "./actions/sendVideoMessage";

export default async function Home() {
  const isConfigured = process.env.SLACK_TOKEN ? true : false;
  const channels = await getChannels();
  const actions = {
    sendVideoMessage,
  };
  console.log(channels);
  return (
    <main className="">
      <h1 className="text-2xl font-bold">Slack App Playground</h1>
      <div>
        {isConfigured ? (
          <span>✅ Slack Token Found</span>
        ) : (
          <span>❌ Missing Slack Token</span>
        )}
      </div>
      <SlackIntegration
        channels={channels}
        actions={actions}
        sendVideoMessage={sendVideoMessage}
      ></SlackIntegration>
    </main>
  );
}
