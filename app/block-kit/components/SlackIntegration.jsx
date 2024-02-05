"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState, useOptimistic } from "react";

export default function SlackIntegration({ channels, actions }) {
  const searchParams = useSearchParams();
  const [toastMessages, settoastMessages] = useState([]);
  const [optimisticToast, addOptimisticToast] = useOptimistic(
    toastMessages,
    (state, newMessage) => [...state, newMessage]
  );

  async function callSlack(e) {
    const action = e.get("slackAction");
    const calledAt = new Date().toLocaleTimeString();
    const message = {
      status: "Pending",
      description: `Sent ${action} request`,
      calledAt: calledAt,
    };
    await addOptimisticToast(message);
    const res = await actions[action](selectedChannel);
    if (res.ok) {
      message.status = "Successful";
    } else {
      message.status = "Error";
    }

    settoastMessages((state) => [...state, message]);
  }

  const [selectedChannel, setSelectedChannel] = useState(
    searchParams.get("selectedChannel")
      ? searchParams.get("selectedChannel")
      : ""
  );

  return (
    <div className="mt-6">
      <Select
        value={selectedChannel}
        onValueChange={(val) => {
          setSelectedChannel(val);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a channel" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Channels</SelectLabel>
            {channels.map((channel) => {
              return (
                <SelectItem key={channel.id} value={channel.id}>
                  {channel.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedChannel ? (
        <section className="grid grid-cols-2 gap-2 p-6 mt-6 border rounded-md  border-grey bg-slate-50">
          <h3 className="text-lg font-bold">Available Actions</h3>
          <div>
            <form action={callSlack}>
              <input
                type="hidden"
                name="slackAction"
                value="sendPlainTextMessage"
              />
              <Button type="submit">Send Plain Text Message</Button>
            </form>
          </div>
          <div className="basis-1/2">
            <form action={callSlack}>
              <input
                type="hidden"
                name="slackAction"
                value="sendVideoMessage"
              />
              <Button type="submit">Send Video Message</Button>
            </form>
          </div>
          <div className="basis-1/2">
            <form action={callSlack}>
              <input
                type="hidden"
                name="slackAction"
                value="sendAlertMessage"
              />
              <Button type="submit">Send Alert Message</Button>
            </form>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-2 gap-2 p-6 mt-6 border rounded-md  border-grey bg-slate-50">
          <h3 className="text-lg font-bold text-slate-500">
            Please select a channel
          </h3>
        </section>
      )}
      <section className="mt-6">
        <Table>
          <TableCaption>A list of your recent Slack messages.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Called At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {optimisticToast.map((message) => {
              return (
                <TableRow key={message.calledAt}>
                  <TableCell className="font-medium">
                    {message.description}
                  </TableCell>
                  <TableCell>{message.status}</TableCell>
                  <TableCell>{message.calledAt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
