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
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChannelSelector({ channels, sendVideoMessage }) {
  const searchParams = useSearchParams();

  const [selectedChannel, setSelectedChannel] = useState(
    searchParams.get("selectedChannel")
      ? searchParams.get("selectedChannel")
      : ""
  );
  return (
    <>
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
      <Button
        onClick={() => {
          sendVideoMessage(selectedChannel);
        }}
      >
        Send Video Message
      </Button>
    </>
  );
}
