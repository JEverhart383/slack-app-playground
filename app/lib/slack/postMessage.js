"use server";

export async function postMessage(channel, blocks) {
  const url = `https://slack.com/api/chat.postMessage`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      channel: channel,
      blocks,
    }),
    headers: {
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      "Content-Type": "application/json; charset-utf8",
    },
  });

  const res = await response.json();
  console.log(res);
  if (res.ok !== true) {
    throw new Error(res.error);
  }
  return res;
}
