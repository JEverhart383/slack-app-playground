export async function GET(request) {
  const url = `https://slack.com/api/conversations.list`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
    },
  });
  const data = await response.json();
  const projects = data.channels.filter(
    (channel) => channel.name === "projects"
  );

  return Response.json({ projects });
}
