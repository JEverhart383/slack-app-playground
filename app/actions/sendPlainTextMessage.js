"use server";

import { postMessage } from "../lib/slack/postMessage";

export async function sendPlainTextMessage(channel) {
  const blocks = [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "This is a plain text section block.",
      },
    },
  ];
  const res = await postMessage(channel, blocks);
  return res;
}
