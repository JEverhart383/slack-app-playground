export async function POST(request) {
  const formData = await request.formData();
  const payload = JSON.parse(formData.get("payload"));
  const channel = payload.channel.id;
  const actions = payload.actions[0];
  let res = null;
  if (actions.type === "users_select") {
    const selectedUserId = actions["selected_user"];
    res = await postMessage(
      channel,
      "You have been assigned an incident.",
      selectedUserId
    );
  } else if (actions.type === "checkboxes") {
    console.log("checkbox-action");
    payload.message.blocks.forEach((block) => {
      if (block.block_id === actions.block_id) {
        block.elements[0].options.forEach((option) => {
          const isSelectedOption =
            actions.selected_options.filter(
              (selectedOption) => selectedOption.value === option.value
            ).length > 0
              ? true
              : false;

          if (isSelectedOption) {
            option.text.text = option.text.text.includes("~")
              ? option.text.text
              : `~${option.text.text}~`;
          } else {
            option.text.text = option.text.text.replaceAll("~", "");
          }
        });
      }
    });
    res = await updateMessage(
      channel,
      payload.message.ts,
      payload.message.blocks
    );
  }

  return Response.json({ res });
}

async function postMessage(channelId, text, selectedUserId) {
  const url = `https://slack.com/api/chat.postMessage`;
  const slackResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      channel: channelId,
      text: `<@${selectedUserId}>, ${text}`,
    }),
    headers: {
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      "Content-Type": "application/json; charset-utf8",
    },
  });

  const res = await slackResponse.json();
  return res;
}

async function updateMessage(channelId, timestamp, blocks) {
  const url = `https://slack.com/api/chat.update`;
  const slackResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      channel: channelId,
      ts: timestamp,
      blocks: blocks,
    }),
    headers: {
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      "Content-Type": "application/json; charset-utf8",
    },
  });

  const res = await slackResponse.json();
  return res;
}
