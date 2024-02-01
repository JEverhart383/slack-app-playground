"use server";

export async function sendVideoMessage(channel) {
  console.log("running");
  const url = `https://slack.com/api/chat.postMessage`;
  const blocks = [
    {
      type: "video",
      title: {
        type: "plain_text",
        text: "How to use Slack.",
        emoji: true,
      },
      title_url: "https://www.youtube.com/watch?v=RRxQQxiM7AA",
      description: {
        type: "plain_text",
        text: "Slack is a nifty way to communicate with your team.",
        emoji: true,
      },
      video_url:
        "https://www.youtube.com/embed/RRxQQxiM7AA?feature=oembed&autoplay=1",
      alt_text: "How to use Slack?",
      thumbnail_url: "https://i.ytimg.com/vi/RRxQQxiM7AA/hqdefault.jpg",
      author_name: "Arcado Buendia",
      provider_name: "YouTube",
      provider_icon_url:
        "https://a.slack-edge.com/80588/img/unfurl_icons/youtube.png",
    },
  ];

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      channel: channel,
      blocks: blocks,
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
