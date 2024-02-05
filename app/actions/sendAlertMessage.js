"use server";

import { postMessage } from "../lib/slack/postMessage";

export async function sendAlertMessage(channel) {
  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "APM ALERT: Elevated Error Rates Detected!",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "2023-12-25\nService: *User Authentication API*\nEnvironment: *Production*",
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*Metrics*\n:red_circle: Error Rate: *15%* (Threshold: 5%)\n:red_circle: Response Time: *900ms* (Average: 200ms)\n:red_circle: Throughput: *1200 rpm* (Requests Per Minute)",
        },
      ],
    },
    {
      type: "image",
      block_id: "image4",
      image_url: "https://i.imgur.com/Bj577mJ.png",
      alt_text: "Error rates.",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Dashboard Link:* <https://example.com|APM Dashboard>",
      },
    },
    {
      type: "divider",
    },
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
  const res = await postMessage(channel, blocks);
  return res;
}
