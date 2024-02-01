export default async function getChannels() {
  const url = `https://slack.com/api/conversations.list`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.channels;
}
