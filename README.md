This is a [Next.js](https://nextjs.org/) project created to demonstrate how to work with Slack resources in several different ways.

## Getting Started

To get started, you can clone this repository to your local machine:

```
git clone https://github.com/JEverhart383/slack-app-playground.git
```

Then you can install the project's dependencies using `npm install`. To start the server in dev mode, run the `npm run dev` command.

Some of the Slack examples, like OAuth and interactivity, require a public HTTPS url, so consider installing [NGROK](https://ngrok.com/) to help connect your local server to the public internet. With your dev server running, the following command will generate a public url you can use in your Slack app settings:

```
ngrok http http://localhost:3000
```
