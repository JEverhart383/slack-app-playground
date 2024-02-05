import Image from "next/image";
import getChannels from "./lib/slack/getChannels";
import SlackIntegration from "./components/SlackIntegration";
import { sendVideoMessage } from "./actions/sendVideoMessage";
import { sendPlainTextMessage } from "./actions/sendPlainTextMessage";
import { sendAlertMessage } from "./actions/sendAlertMessage";

export default async function Home() {
  const isConfigured = process.env.SLACK_TOKEN ? true : false;
  const channels = await getChannels();
  const actions = {
    sendVideoMessage,
    sendPlainTextMessage,
    sendAlertMessage,
  };
  console.log(channels);
  return (
    <main className="flex flex-col content-center m-6">
      <h1 className="text-2xl font-bold">Slack App Playground</h1>
      <section>
        {isConfigured ? (
          <>
            <span>✅ Slack Token Found</span>
            <SlackIntegration
              channels={channels}
              actions={actions}
            ></SlackIntegration>
          </>
        ) : (
          <span>❌ Missing Slack Token</span>
        )}
      </section>
    </main>
  );
}
