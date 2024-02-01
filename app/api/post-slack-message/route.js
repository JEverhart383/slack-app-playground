export async function GET(request) {
  const url = `https://slack.com/api/chat.postMessage`;
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Assign incident to:",
      },
      accessory: {
        type: "users_select",
        placeholder: {
          type: "plain_text",
          text: "Select a team member",
          emoji: true,
        },
        action_id: "users_select-action",
      },
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Recommended Actions:",
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "checkboxes",
          options: [
            {
              text: {
                type: "mrkdwn",
                text: "*Verify backend database health and connection.*",
              },
              value: "value-0",
            },
            {
              text: {
                type: "mrkdwn",
                text: "*Check Redis server and related metrics.*",
              },
              value: "value-1",
            },
            {
              text: {
                type: "mrkdwn",
                text: "*Assess recent deployments for potential issues.*",
              },
              value: "value-2",
            },
          ],
          action_id: "actionId-1",
        },
      ],
    },
  ];
  const data = new FormData();
  data.append("channel", "C06GCKH3E68");
  data.append("text", "Test message");
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      channel: "C06GCKH3E68",
      blocks: blocks,
    }),
    headers: {
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      "Content-Type": "application/json; charset-utf8",
    },
  });

  const res = await response.json();
  return Response.json({ res });
}
